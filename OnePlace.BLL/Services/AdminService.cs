using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL;
using OnePlace.BOL.AdminDTO;
using OnePlace.BOL.AdminPayload;
using OnePlace.BOL.Description;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.Review;
using OnePlace.BOL.ReviewReply;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Enums;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        public AdminService(IMapper mapper, 
            IConfiguration configuration, 
            IUnitOfWork unitOfWork,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<int> AddReviewReply(ReviewReplyPayload reviewReplyPayload)
        {
            ReviewReply reviewReply = _mapper.Map<ReviewReply>(reviewReplyPayload);

            var review = await _unitOfWork.Reviews.GetAsync(reviewReply.ReviewId);
            if (review is null)
                throw new ArgumentException("review with this id does not exist");

            _unitOfWork.ReviewReplies.Create(reviewReply);
            await _unitOfWork.SaveAsync();

            return reviewReply.ReviewId;
        }

        public async Task<int> DeleteMessage(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException("Некоректний ID!");

            var message = await _unitOfWork.Messages.GetAsync(id);

            if (message is null)
                throw new NotFoundException("Повідомлення з таким ID не існує!");

            await _unitOfWork.Messages.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteOrder(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var order = await _unitOfWork.Orders.GetAsync(id);

            if (order is null)
                throw new NotFoundException(nameof(order) + " order with this id does not exist");

            foreach (var orderProduct in order.OrderProducts)
            {
                Composite3Key key = new Composite3Key
                {
                    Column1 = orderProduct.OrderId,
                    Column2 = orderProduct.ProductId,
                    Column3 = orderProduct.ColorId
                };
                await _unitOfWork.OrderProducts.DeleteAsync(key);

            }
           
            await _unitOfWork.Orders.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteReview(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException("Некоректний ID!");

            var review = await _unitOfWork.Reviews.GetAsync(id);
            if (review is null)
                throw new NotFoundException("Відгук з таким ID не існує!");
          
            await _unitOfWork.ReviewReplies.DeleteAsync(id);
            await _unitOfWork.Reviews.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteReviewReply(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var reviewReply = await _unitOfWork.ReviewReplies.GetAsync(id);
            if (reviewReply is null)
                throw new NotFoundException(nameof(reviewReply) + " reviewReply with this id does not exist");

            await _unitOfWork.ReviewReplies.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteUser(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var user = await _unitOfWork.Users.GetAsync(id);

            if (user is null)
                throw new NotFoundException(nameof(user) + " user with this id does not exist");

            await _unitOfWork.Users.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<IEnumerable<MessageDTO>> GetMessages()
        {
            var messages = await _unitOfWork.Messages.GetAllAsync();

            List<MessageDTO> messagesDTO = new List<MessageDTO>();
            foreach (var message in messages)
            {
                MessageDTO messageDTO = _mapper.Map<MessageDTO>(message);
                IEnumerable<ProductPicture> productPictures = await _unitOfWork.ProductPictures
                    .FindAsync(p => p.ProductId == message.ProductId && p.IsTitle == true);

                messageDTO.ProductPictureAddress = productPictures.FirstOrDefault().Picture.Address;
                messagesDTO.Add(messageDTO);
            }
           
            return messagesDTO;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _unitOfWork.Orders.GetAllAsync();
            return orders;
        }

        public async Task<ReviewDTO> GetReview(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var review = await _unitOfWork.Reviews.GetAsync(id);

            if (review is null)
                throw new NotFoundException(nameof(review) + " review with this id does not exist");

            ReviewDTO reviewDTO = _mapper.Map<ReviewDTO>(review);
            IEnumerable<ProductPicture> productPictures = await _unitOfWork.ProductPictures
                    .FindAsync(p => p.ProductId == review.ProductId && p.IsTitle == true);

            reviewDTO.ProductPictureAddress = productPictures.FirstOrDefault().Picture.Address;

            return reviewDTO;
        }

        public async Task<IEnumerable<ReviewReplyDTO>> GetReviewReplies()
        {
            var reviewReplies = await _unitOfWork.ReviewReplies.GetAllAsync();
            List<ReviewReplyDTO> reviewRepliesDTO = new List<ReviewReplyDTO>();

            foreach (var reviewReply in reviewReplies)
            {
                ReviewReplyDTO reviewReplyDTO = _mapper.Map<ReviewReplyDTO>(reviewReply);
                Review review = await _unitOfWork.Reviews.GetAsync(reviewReply.ReviewId);
                reviewReplyDTO.Review = _mapper.Map<ReviewDTO>(review);

                reviewRepliesDTO.Add(reviewReplyDTO);
            }
            return reviewRepliesDTO;
        }

        public async Task<ReviewReplyDTO> GetReviewReply(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var reviewReply = await _unitOfWork.ReviewReplies.GetAsync(id);

            if (reviewReply is null)
                throw new NotFoundException(nameof(reviewReply) + " reviewReply with this id does not exist");

            ReviewReplyDTO reviewReplyDTO = _mapper.Map<ReviewReplyDTO>(reviewReply);
            Review review = await _unitOfWork.Reviews.GetAsync(reviewReply.ReviewId);
            reviewReplyDTO.Review = _mapper.Map<ReviewDTO>(review);

            return reviewReplyDTO;
        }

        public async Task<IEnumerable<ReviewDTO>> GetReviews()
        {
            var reviews = await _unitOfWork.Reviews.GetAllAsync();

            List<ReviewDTO> reviewsDTO = new List<ReviewDTO>();
            foreach (var review in reviews)
            {
                ReviewDTO reviewDTO = _mapper.Map<ReviewDTO>(review);
                IEnumerable<ProductPicture> productPictures = await _unitOfWork.ProductPictures
                    .FindAsync(p => p.ProductId == review.ProductId && p.IsTitle == true);

                reviewDTO.ProductPictureAddress = productPictures.FirstOrDefault().Picture.Address;
                reviewsDTO.Add(reviewDTO);
            }

            return reviewsDTO;
        }

        public async Task<IEnumerable<PureUser>> GetUsers()
        {
            var users = await _unitOfWork.Users.GetAllAsync();
            List<PureUser> res = _mapper.Map<List<PureUser>>(users);

            //Видалити користувача з ІД 1 (адмін) тимчасовий варіант
            res.Remove(res.Where(u => u.Id == 1).FirstOrDefault());

            foreach (var user in res)
            {
                user.CountOfOrders = _unitOfWork.Orders.FindAsync(o => o.UserId == user.Id).Result.Count();
            }

            return res;
        }

        public async Task<int> UpdateMessage(UpdateMessagePayload messagePayload)
        {
            if (messagePayload.Id <= 0)
                throw new ArgumentNullException(nameof(messagePayload.Id) + " некоректний ID");

            var message = await _unitOfWork.Messages.GetAsync(messagePayload.Id);

            if (message is null)
                throw new NotFoundException(nameof(message) + " message with this id does not exist");

            message.IsReplied = messagePayload.IsReplied;
            _unitOfWork.Messages.Update(message);
            await _unitOfWork.SaveAsync();

            return messagePayload.Id;
        }

        public async Task<int> UpdateOrder(UpdateOrderPayload orderPayload)
        {
            if (orderPayload.Id <= 0)
                throw new ArgumentNullException(nameof(orderPayload.Id) + " некоректний ID");

            var order = await _unitOfWork.Orders.GetAsync(orderPayload.Id);

            if (order is null)
                throw new NotFoundException(nameof(order) + " order with this id does not exist");

            OrderState state;
            if (Enum.TryParse<OrderState>(orderPayload.State, true, out state) == false)
                throw new ArgumentException("could not parse passed order state to enum");

            order.State = state;
            _unitOfWork.Orders.Update(order);
            await _unitOfWork.SaveAsync();

            return orderPayload.Id;
        }

        public async Task<List<ManufacturerDTO>> GetAllManufacturers()
        {
            return _mapper.Map<List<ManufacturerDTO>>(await _unitOfWork.Manufacturers.GetAllAsync());
        }
    
        public async Task<List<ManufacturerCountryDTO>> GetAllCountries()
        {
            return _mapper.Map<List<ManufacturerCountryDTO>>(await _unitOfWork.ManufactureCountries.GetAllAsync());
        }

        public async Task<List<ColorDTO>> GetAllColors()
        {
            return _mapper.Map<List<ColorDTO>>(await _unitOfWork.Colors.GetAllAsync());
        }

        public async Task<List<DescriptionHeader>> GetDescriptionsByCategoryId(int categoryId)
        {
            if (categoryId < 1)
            {
                throw new ArgumentException("Недійсне id категорії");
            }
            var descriptions = await _unitOfWork.Descriptions.FindAsync(
                d => d.CategoryId == categoryId);
            
            List<DescriptionHeader> result = new List<DescriptionHeader>();
            foreach ( var description in descriptions ) 
            {
                result.Add(new DescriptionHeader()
                {
                    Id = description.Id,
                    Name = description.Name
                });
            }
            return result;
        }

        public async Task<int> CreateColor(ColorToAdd colorToAdd)
        {
            if(colorToAdd.Name.Length == 0)
            {
                throw new BusinessException("Немає назви кольору!");
            }
            if(_unitOfWork.Colors.FindAsync(c=>c.Name== colorToAdd.Name).Result.Count() > 0)
            {
                throw new BusinessException("Колір з такою назвою уже існує!");
            }

            DAL.Entities.Color color = _mapper.Map<DAL.Entities.Color>(colorToAdd);

            _unitOfWork.Colors.Create(color);
        
            await _unitOfWork.SaveAsync();
            return color.Id;
        }

        public async Task<int> DeleteColor(int colorId)
        {
            if (colorId <= 0)
                throw new ArgumentNullException("Некоректний ID кольору!");

            if(_unitOfWork.ProductColors.FindAsync(c=>c.ColorId==colorId).Result.Count() > 0)
                throw new BusinessException("Цей колір використовуєтсья деякими продуктами!");
            

            await _unitOfWork.Colors.DeleteAsync(colorId);
            await _unitOfWork.SaveAsync();
            return colorId;
        }

        public async Task<int> UpdateColor(ColorDTO color)
        {
            if(_unitOfWork.Colors.FindAsync(c=>c.Id == color.Id).Result.FirstOrDefault() is not null)
            {
                DAL.Entities.Color updatedColor = _mapper.Map<DAL.Entities.Color>(color);
                _unitOfWork.Colors.Update(updatedColor);
                await _unitOfWork.SaveAsync();
                return updatedColor.Id;
            }
            throw new BusinessException("Неіснуючий колір!");
        }

        public async Task<int> CreateCountry(string countryName)
        {
            if (countryName.Length < 2)
                throw new ArgumentException("Немає назви країни!");
            if(_unitOfWork.ManufactureCountries.FindAsync(c=>c.Name.ToLower() == countryName.ToLower()).Result.Count() > 0)
            {
                throw new BusinessException("Така країна вже існує!");
            }

            ManufactureCountry country = new ManufactureCountry
            {
                Name= countryName,
            };
            _unitOfWork.ManufactureCountries.Create(country);
            await _unitOfWork.SaveAsync();
            return country.Id;
        }

        public async Task<int> DeleteCountry(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException("Некоректний ID країни!");
            if (_unitOfWork.Products.FindAsync(p=>p.ManufacturerCountryId == id).Result.FirstOrDefault() is not null)
                throw new BusinessException("Ця країна використовується деякими продуктами!");
        
            await _unitOfWork.ManufactureCountries.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            return id;
        }

        public async Task<int> UpdateCountry(ManufacturerCountryDTO country)
        {
            if (_unitOfWork.ManufactureCountries.FindAsync(c => c.Id == country.Id).Result.FirstOrDefault() is not null)
            {
                ManufactureCountry updatedCountry= _mapper.Map<ManufactureCountry>(country);
                _unitOfWork.ManufactureCountries.Update(updatedCountry);
                await _unitOfWork.SaveAsync();
                return updatedCountry.Id;
            }
            throw new BusinessException("Неіснуюча країна!");
        }

        public async Task<int> CreateBrand(string brandName)
        {
            if (brandName.Length < 2)
                throw new ArgumentException("Немає назви виробника!");
            if (_unitOfWork.Manufacturers.FindAsync(m => m.Name.ToLower() == brandName.ToLower()).Result.Count() > 0)
            {
                throw new BusinessException("Такий виробник вже існує!");
            }

            Manufacturer brand = new Manufacturer
            {
                Name = brandName,
            };
            _unitOfWork.Manufacturers.Create(brand);
            await _unitOfWork.SaveAsync();
            return brand.Id;
        }

        public async Task<int> DeleteBrand(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException("Некоректний ID виробника!");
            if (_unitOfWork.Products.FindAsync(p => p.Manufacturer.Id == id).Result.FirstOrDefault() is not null)
                throw new BusinessException("Цей виробник використовується деякими продуктами!");

            await _unitOfWork.Manufacturers.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
            return id;
        }

        public async Task<int> UpdateBrand(ManufacturerDTO brand)
        {
            if (_unitOfWork.Manufacturers.FindAsync(m => m.Id == brand.Id).Result.FirstOrDefault() is not null)
            {
                Manufacturer updatedBrand= _mapper.Map<Manufacturer>(brand);
                _unitOfWork.Manufacturers.Update(updatedBrand);
                await _unitOfWork.SaveAsync();
                return updatedBrand.Id;
            }
            throw new BusinessException("Неіснуючий виробник!");
        }
    
        public async Task<List<ProductSaleStatisticDTO>> GetProductSalingInfo(GetProductSaleStatisticPayload saleStatisticPayload)
        {
            if (saleStatisticPayload is null)
                throw new ArgumentNullException("Передані невірні дані!");

            var productSaleStatisticDTO = _mapper.Map<GetProductSaleStatisticDTO>(saleStatisticPayload);

            if (productSaleStatisticDTO.CategoryId <= 0)
                throw new BusinessException("Неіснуюча категорія!");
            if (saleStatisticPayload.Period.Date.AddDays(1) > DateTime.Now.Date)
                throw new BusinessException("Дата не може бути новіша ніж сьогоднішня!");

            var allProductsIdsFromCategory = _unitOfWork.Products
                .FindAsync(p=>p.CategoryId == saleStatisticPayload.CategoryId).Result.Select(p=>p.Id).ToList();
            
            var allOrdersIdByDate = _unitOfWork.Orders.FindAsync(
                o => o.Date >= saleStatisticPayload.Period.Date.AddDays(1) &&
                o.State == OrderState.Done && o.PaymentStatus == PaymentStatus.Approved).Result.Select(o=>o.Id).ToList();

            List<ProductSaleStatisticDTO> productSaleStatistic = new List<ProductSaleStatisticDTO>();

            foreach (var orderId in allOrdersIdByDate)
            {

               var ordersProducts = _unitOfWork.OrderProducts.FindAsync(o => o.OrderId == orderId 
                                        && allProductsIdsFromCategory.Contains(o.ProductId)).Result.ToList();

                //Якщо замовлення містить мінімум 1 товар з потрібної категорії
                if(ordersProducts is not null)
                {
                    //Тільки ті замовлення які точно містять товар з потрібної категорії
                    foreach (var orderProduct in ordersProducts)
                    {

                        var product = await _unitOfWork.Products.GetAsync(orderProduct.ProductId);
                        
                        //Якщо замовлений товар ще існує
                        if(product is not null)
                        {
                            //Колір товару із замовлення
                            var productColor = await _unitOfWork.ProductColors.GetAsync(new Composite2Key
                            {
                                Column1 = product.Id,
                                Column2 = orderProduct.ColorId
                            });

                            if(productColor is not null)
                            {
                                var existedProductSaleStatisticElement = productSaleStatistic.Where(p => p.Id == product.Id).FirstOrDefault();
                                
                                if(existedProductSaleStatisticElement is null) 
                                {
                                    var picture = await _unitOfWork.ProductPictures.GetAsync(new Composite2Key
                                    {
                                        Column1= product.Id,
                                        Column2 = product.ProductPictures.Where(p => p.IsTitle == true).FirstOrDefault().PictureId
                                    });

                                    //Створити новий елемент статистики 
                                    ProductSaleStatisticDTO saledProduct = new ProductSaleStatisticDTO
                                    {
                                        Id = product.Id,
                                        Color = productColor.Color.Name,
                                        Quantity = productColor.Quantity,
                                        Price = orderProduct.Price,
                                        Code = product.Code,
                                        Name = product.Name,
                                        Picture = picture.Picture.Address,
                                        Sold = orderProduct.Quantity
                                    };
                                    productSaleStatistic.Add(saledProduct);
                                }
                                else
                                {
                                    int index = productSaleStatistic.IndexOf(existedProductSaleStatisticElement);
                                    existedProductSaleStatisticElement.Sold += orderProduct.Quantity;
                                    productSaleStatistic[index] = existedProductSaleStatisticElement;
                                }
                            }
                        }
                    }
                }
            }

            return productSaleStatistic;
        }
    
        public async Task<int> GetUsersCountByRegistrateDate(DateTime date)
        {
            var count = _unitOfWork.Users.FindAsync(u => u.RegistrationDate.Date >= date.Date).Result.ToList().Count();
            return count;
        }
    }
}