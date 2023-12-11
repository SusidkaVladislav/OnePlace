using OnePlace.BLL.Interfaces;
using OnePlace.BOL.Analitics;
using OnePlace.BOL.Review;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace OnePlace.BLL.Services
{
    public class AnaliticService : IAnaliticService
    {
        private IUnitOfWork _unitOfWork;

        public AnaliticService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<FiltersInfo> GetCategoryProductFilters(int categoryId)
        {
            if (_unitOfWork.Categories.GetAsync(categoryId).Result is null)
                throw new ArgumentException("Не існуюча категорія!");

            var products = _unitOfWork.Products.FindAsync(p => p.CategoryId == categoryId).Result.ToList();

            FiltersInfo filtersInfo = new FiltersInfo();

            if (products.Count > 0)
            {
                Dictionary<int, string> manufacturers = new Dictionary<int, string>();
                Dictionary<int, string> countries = new Dictionary<int, string>();
                Dictionary<int, string> colors = new Dictionary<int, string>();

                Dictionary<int, CharacteristicNameWithOptions> descriptions = new Dictionary<int, CharacteristicNameWithOptions>();

                //Обробка фільтрів(перебір всіх товарів які пройшли відбір і вивчення їхніх характеристик)
                foreach (var product in products)
                {
                    #region Виробники
                    var manufaturer = product.Manufacturer;
                    if (!manufacturers.ContainsKey(manufaturer.Id))
                    {
                        manufacturers.Add(manufaturer.Id, manufaturer.Name);
                    }
                    #endregion

                    #region Країни
                    var country = product.ManufacturerCountry;
                    if (!countries.ContainsKey(country.Id))
                        countries.Add(country.Id, country.Name);
                    #endregion

                    #region Кольори
                    foreach (var color in product.ProductColors)
                    {
                        if (!colors.ContainsKey(color.ColorId))
                        {
                            string colorName = _unitOfWork.Colors.GetAsync(color.ColorId).Result.Name;
                            colors.Add(color.ColorId, colorName);
                        }
                    }
                    #endregion

                    #region Характеристики
                    foreach (var characteristic in product.ProductDescriptions)
                    {
                        if (!descriptions.ContainsKey(characteristic.DescriptionId))
                        {
                            var desc = await _unitOfWork.Descriptions.GetAsync(characteristic.DescriptionId);

                            descriptions.Add(characteristic.DescriptionId, new CharacteristicNameWithOptions
                            {
                                Name = desc.Name,
                                Options = new List<string>
                                {
                                    characteristic.About
                                }
                            });
                        }
                        else
                        {
                            var desc = descriptions[characteristic.DescriptionId];
                            desc.Options.Add(characteristic.About);
                        }
                    }
                    #endregion
                }

                Dictionary<string, Dictionary<string, List<string>>> optionsAnalitic = new Dictionary<string, Dictionary<string, List<string>>>();
                foreach (var description in descriptions)
                {
                    Dictionary<string, List<string>> options = new Dictionary<string, List<string>>();
                    foreach (var option in description.Value.Options)
                    {
                        if (options.ContainsKey(option))
                        {
                            options[option].Add(option);
                        }
                        else
                        {
                            options.Add(option, new List<string> { option });
                        }
                    }
                    optionsAnalitic.Add(description.Value.Name, options);
                }

                Dictionary<string, HashSet<string>> descriptionFilters = new Dictionary<string, HashSet<string>>();
                foreach (var option in optionsAnalitic)
                {
                    HashSet<string> abouts = new HashSet<string>();
                    foreach (var desc in option.Value)
                    {
                        if ((100 * desc.Value.Count / products.Count) >= 15)
                        {
                            abouts.Add(desc.Key);
                        }
                    }
                    if (abouts.Count >= 2)
                    {
                        descriptionFilters.Add(option.Key, abouts);
                    }
                }


                filtersInfo.Manufacturers = manufacturers;
                filtersInfo.Countries = countries;
                filtersInfo.Colors = colors;
                filtersInfo.DescriptionFilters = descriptionFilters;
            }

            return filtersInfo;
        }


        public async Task<List<ReviewByProduct>> GetProductReviews(int productId)
        {
            List<ReviewByProduct> result = new List<ReviewByProduct>();

            var reviews = _unitOfWork.Reviews.FindAsync(r => r.ProductId == productId).Result.ToList();

            if (reviews.Count == 0)
                return result;

            foreach (var review in reviews)
            {
                var user = await _unitOfWork.Users.GetAsync(review.UserId);

                ReviewByProduct reviewByProduct = new ReviewByProduct
                {
                    Id = review.Id,
                    Comment = review.Comment,
                    CommentDate = review.Date,
                    NumberOfStars = review.NumberOfStars,
                    UserInitials = user.Surname + " " + user.Name
                };

                var reply = await _unitOfWork.ReviewReplies.GetAsync(review.Id);

                if (reply is not null)
                {
                    reviewByProduct.AmindReplyDate = reply.Date;
                    reviewByProduct.AdminReplyComment = reply.Comment;
                }

                result.Add(reviewByProduct);
            }

            return result;
        }
    }
}
