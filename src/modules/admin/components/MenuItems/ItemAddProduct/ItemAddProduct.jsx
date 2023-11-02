import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';
import
{
    addProduct,
    setCategory,
    setFullCategoryPath,
    getAllBrands,
    getAllCountries,
    getAllColors,
    addColorPriceBlock,
    deleteColorPriceBlock,
    getCharacteristicsFromCategory,
    deleteCharachteristicFormCategory,
    addCharachteristic,
    deleteCharachteristic,
    setProductName,
    charachteristicsReset,
    setManufacturerCountry,
    setManufacturer,
    setDescriptions,
    setSale,
    setIsInBestProducts,
    resetProduct,
    resetAllProducts,
    resetFilteredProducts,
    resetCategory,
    setProductCode,
    setCategoryValid,
    setNameValid,
    setColorValid,
    setCodeValid,
    setDescriptionValid,
    setCharachteristicsValid,
    hideUnsuccessfulAlert,
    hideSuccessfulAlert,
    updateColorPriceBlock,
} from '../../../features/adminProduct/adminProductSlice';
//#endregion

//#region Services
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';
import ColorPriceItem from './add-product-components/product-color-price/ColorPriceItem';
import DiscountAmountInput from './add-product-components/add-product-discount/DiscountAmountInput';
import DiscountRangePicker from './add-product-components/add-product-discount/DiscountRangePicker';
import DescriptionOfCategory from './add-product-components/add-product-description/DescriptionOfCategory';
import NewDescription from './add-product-components/add-product-description/NewDescription';
import UnsuccessfulNotification from '../../../controls/notifications/UnsuccessfulNotification';
import ImgBBUpload from '../../../../../services/image-upload-service/ImgBBUpload';
//#endregion

//#region Icons
import CommonPicture from './add-product-components/add-product-pictures/CommonPicture';
import BackIcon from '../../../../../svg/arrows/BackTextAndArrowIcon';
import GreenCheckCheckboxIcon from '../../../../../svg/shared-icons/GreenCheckCheckboxIcon';
//#endregion

import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import './ItemAddProductStyles.css';

const ItemAddProduct = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { upload } = ImgBBUpload();


    //#region Validation states
    const [colorValidity, setColorValidadity] = useState(true)
    const [pictureValidity, setPictureValidity] = useState(true)
    //#endregion

    const { categoriesForSelect } = useSelector(state => state.adminCategories);
    const [productPictures, setProductPictures] = useState([]);
    const [description, setDescription] = useState('');
    const [mainPicturePath, setPicturePath] = useState({
        pictureId: null,
        picturePath: '',
    });
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [productCharacteristics, setProductCharacteristics] = useState(false);

    var mainCategories = useRef([]);
    var subCategories = useRef([]);
    const inputFile = useRef(null);
    var characteristicFromCategoryLeftSide = [];
    var characteristicFromCategoryRightSide = [];
    var blocks = [];
    var images = [];

    const {
        category,
        categoryFullPath,
        allBrands,
        allCountries,
        allColors,
        productColorPrice,
        charachteristicsFromCategory,
        charachteristics,
        manufacturerCountryId,
        manufacturerId,
        productSale,
        isInBestProducts,
        nameValid,
        colorValid,
        codeValid,
        descriptionValid,
        charachteristicsValid,
        unsuccessfulAlertShow,
        actionNotification, } = useSelector(state => state.adminProducts);

    const [percentAmount, setPercentAmount] = useState(productSale ? productSale.percent ? productSale.percent : 0 : 0);
    const [startDiscount, setStartDiscount] = useState(productSale ? productSale.startDate ? new Date(productSale.startDate) : new Date() : new Date());
    const [endDiscount, setEndDiscount] = useState(productSale ? productSale.endDate ? new Date(productSale.endDate) : new Date() : new Date());
    const [pictureFiles, setPictureFiles] = useState([])
    const [loading, setLoading] = useState(true);


    var productColorsBlocks = {
        productColorPriceBlock: productColorPrice
    }

    var productDescriptionsFromCategory = {
        productDescriptionFromCategory: charachteristicsFromCategory
    }

    var productAddedCharacteristics = {
        productCharacteristic: charachteristics
    }

    useEffect(() =>
    {
        dispatch(resetProduct())
        dispatch(resetAllProducts())
        dispatch(resetFilteredProducts())
        dispatch(resetCategory())
        dispatch(getAllBrands());
        dispatch(getAllCountries());
        dispatch(getAllColors());

        dispatch(getCategoriesForSelect())
            .then(() =>
            {
                setLoading(false);
                mainCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId === null)
                subCategories.current = categoriesForSelect.filter((category) => category.parentCategoryId !== null)
            })
            .catch((error) =>
            {
                console.error('Failed to fetch data', error);
                setLoading(false);
                navigate(-1);
            });

        productAddedCharacteristics = {
            productCharacteristic: charachteristics
        }
    }, [])


    useEffect(() =>
    {
        if (allBrands.length > 0)
            dispatch(setManufacturer(allBrands[0].id));

        if (allCountries.length > 0)
            dispatch(setManufacturerCountry(allCountries[0].id));

        if (allColors.length > 0)
            dispatch(updateColorPriceBlock({
                blockId: 0,
                colorId: allColors[0].id,
                price: 0,
                quantity: 0,
            }))
    }, [allBrands, allCountries, allColors])


    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190 || event.which === 187)
        {
            event.preventDefault();
        }
    }

    //#region Category

    const selectCategory = async (id, name, fullPath) =>
    {
        dispatch(setCategory({ id: id, name: name }))
        dispatch(setFullCategoryPath(fullPath));
        dispatch(charachteristicsReset());
        dispatch(setCategoryValid(true));
        await dispatch(getCharacteristicsFromCategory(id));
    }

    //#endregion

    //#region Brand

    const handleSelectBrand = (event) =>
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturer(Number(selectedValue)));
    }

    //#endregion

    //#region Country

    const handleSelectCountry = (event) => 
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturerCountry(Number(selectedValue)));
    };

    //#endregion

    //#region Color-Quantity-Price

    const addColorPrice = () =>
    {
        if (productColorPrice.length < allColors.length)
        {
            let lastBlockId = 0;
            if (productColorPrice.length > 0)
                lastBlockId = productColorPrice[productColorPrice.length - 1].blockId;

            dispatch(addColorPriceBlock(
                {
                    blockId: lastBlockId + 1,
                    colorId: allColors[0].id,
                    price: 0,
                    quantity: 0,
                }
            ))
            productColorsBlocks.productColorPriceBlock = productColorPrice;
            setColorValidadity(true)
        }
    }

    const deleteBlock = (blockId) =>
    {
        if (productColorPrice.length >= 2)
        {
            dispatch(deleteColorPriceBlock(blockId));
            dispatch(setColorValid(true));
        }
    }

    const generateColorBlocks = () =>
    {
        for (let i = 0; i < productColorsBlocks.productColorPriceBlock.length; i++)
        {
            blocks.push(<ColorPriceItem
                colors={allColors}
                productColorsBlocks={productColorsBlocks.productColorPriceBlock[i]}
                key={productColorsBlocks.productColorPriceBlock[i].blockId}
                deleteColorPriceBlock={deleteBlock}
                colorValidity={colorValidity}
            />)
        }

        return blocks;
    }

    //#endregion

    //#region Sale

    const handlePercentAmountChange = (newPercentAmount) =>
    {
        setPercentAmount(newPercentAmount);
    }

    const handleStartDateChange = (newStartDate) =>
    {
        const formattedStartDate = new Date(newStartDate).toDateString();
        setStartDiscount(formattedStartDate);
    }

    const handleEndDateChange = (newEndDate) =>
    {
        const formattedStartDate = new Date(newEndDate).toDateString();
        setEndDiscount(formattedStartDate);
    }

    //#endregion

    //#region Pictures

    const openFileManager = () =>
    {
        inputFile.current.click();
    }

    const getPicture = (event) =>
    {
        let file = event.target.files[0];

        if (file !== undefined)
        {
            setPictureValidity(true);
            let id = uuidv4();
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>
            {
                if (mainPicturePath.picturePath.length > 0)
                {
                    var newPictureBlock = {}

                    try
                    {
                        let lastPictureBlockId = productPictures[productPictures.length - 1].pictureBlockId;
                        newPictureBlock = {
                            id: id,
                            pictureBlockId: lastPictureBlockId + 1,
                            picturePath: reader.result,
                        };

                        const updatedPictureFiles = [...pictureFiles, {
                            id: id,
                            pictureBlockId: lastPictureBlockId + 2,
                            pictureFile: file,
                            isTitle: false,
                        }];

                        setPictureFiles(updatedPictureFiles)
                    }
                    catch
                    {
                        newPictureBlock = {
                            id: id,
                            pictureBlockId: 0,
                            picturePath: reader.result,
                        };

                        const updatedPictureFiles = [...pictureFiles, {
                            id: id,
                            pictureBlockId: 1,
                            pictureFile: file,
                            isTitle: false,
                        }];

                        setPictureFiles(updatedPictureFiles)
                    }
                    finally
                    {
                        setProductPictures([...productPictures, newPictureBlock]);
                    }
                }
                else
                {
                    setPicturePath({
                        pictureId: id,
                        picturePath: reader.result
                    })

                    setPictureFiles([{
                        id: id,
                        pictureBlockId: 0,
                        pictureFile: file,
                        isTitle: true,
                    }])
                }

                document.getElementById('main-picture-add-product').style.display = "block";
            };
        }
    }

    const RemovePicture = (blockId, imageHintId) =>
    {
        const filteredPictures = productPictures.filter((block) => block.pictureBlockId !== blockId);
        setProductPictures(filteredPictures)

        const updatedPictureFiles = pictureFiles.filter(item => item.pictureBlockId !== blockId);
        setPictureFiles(updatedPictureFiles);
    }

    const setMainPicture = (blockId, srcPath, imageHintId) => 
    {
        var pictures = productPictures;
        var index = productPictures.findIndex(x => x.pictureBlockId === blockId);

        pictures[index].picturePath = mainPicturePath.picturePath;
        pictures[index].id = mainPicturePath.pictureId;

        setProductPictures(pictures)

        setPicturePath({
            pictureId: imageHintId,
            picturePath: srcPath,
        });

        const updatedPictureFile = pictureFiles.map((item, index) =>
        {
            if (item.id === imageHintId)
            {
                item.isTitle = true;
            }
            else
            {
                item.isTitle = false;
            }
            return item;
        });

        setPictureFiles(updatedPictureFile);
    }

    const generatePicturesBlocks = () =>
    {
        for (let i = 0; i < productPictures.length; i++)
        {
            images.push(
                <CommonPicture
                    keyIndex={i}
                    imageHintId={productPictures[i].id}
                    srcPath={productPictures[i].picturePath}
                    pictureId={productPictures[i].pictureBlockId}
                    onRemove={RemovePicture}
                    onSetMain={setMainPicture}
                />)
        }

        return images;
    }

    const hideImg = () =>
    {
        document.getElementById('main-picture-add-product').style.display = "none";
    }

    const scrollHandler = (evt) =>
    {
        evt.target.scrollLeft += evt.deltaY;
    }

    //#endregion


    const goToCharacteristics = async () =>
    {
        dispatch(setProductName(name));
        dispatch(setProductCode(code));
        dispatch(setDescriptions(description));

        dispatch(setSale({
            percent: percentAmount,
            startDate: new Date(startDiscount).toDateString(),
            endDate: new Date(endDiscount).toDateString()
        }));

        if (categoryValidation() &&
            nameValidation() &&
            brandValidation() &&
            countryValidation() &&
            colorIdValidation() &&
            codeValidation() &&
            picturesValidation() &&
            descriptionValidation()
        )
            setProductCharacteristics(true)
    }

    //#region Validations

    function isEmpty(obj)
    {
        return Object.keys(obj).length === 0;
    }

    const brandValidation = () =>
    {
        if (manufacturerId === -1)
        {
            if (allBrands.length > 0)
            {
                dispatch(setManufacturer(allBrands[0].id));
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    const countryValidation = () =>
    {
        if (manufacturerCountryId === -1)
        {
            if (allCountries.length > 0)
            {
                dispatch(setManufacturerCountry(allCountries[0].id));
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    const categoryValidation = () =>
    {
        if (isEmpty(category) || category.id === null)
        {
            dispatch(setCategoryValid(false));
            return false;
        }
        else
        {
            dispatch(setCategoryValid(true));
            return true;
        }
    }

    const nameValidation = () =>
    {
        if (name.length < 2)
        {
            dispatch(setNameValid(false))
            return false;
        }
        else
        {
            dispatch(setNameValid(true))
            return true;
        }
    }

    const colorIdValidation = () =>
    {
        if (productColorsBlocks.productColorPriceBlock[0].colorId === -1)
        {
            setColorValidadity(false)
            return false;
        }
        const colorIds = productColorsBlocks.productColorPriceBlock.map((block) => block.colorId);
        const uniqueColorIds = new Set(colorIds);
        const areAllUnique = colorIds.length === uniqueColorIds.size;
        if (areAllUnique)
        {
            dispatch(setColorValid(true))
            setColorValidadity(true)
            return true;
        }
        else
        {
            dispatch(setColorValid(false))
            setColorValidadity(false)
            return false;
        }
    }

    const codeValidation = () =>
    {
        if (code.length >= 4)
        {
            dispatch(setCodeValid(true))
            return true;
        }
        else
        {
            dispatch(setCodeValid(false))
            return false;
        }
    }

    const picturesValidation = () =>
    {
        if (pictureFiles.length > 0)
        {
            setPictureValidity(true);
            return true;
        }
        else
        {
            setPictureValidity(false);
            return false;
        }
    }

    const descriptionValidation = () =>
    {
        if (description.length < 20)
        {
            dispatch(setDescriptionValid(false))
            return false;
        }
        else
        {
            dispatch(setDescriptionValid(true))
            return true;
        }
    }

    //#endregion 


    //#region Descriptions

    const generateDescriptionsFromCategoryLeft = () =>
    {
        characteristicFromCategoryLeftSide = [];
        if (productDescriptionsFromCategory.productDescriptionFromCategory !== undefined)
        {
            for (let c = 0; c < productDescriptionsFromCategory.productDescriptionFromCategory.length; c++)
            {
                if (c % 2 === 0)
                    characteristicFromCategoryLeftSide.push(
                        <DescriptionOfCategory
                            key={productDescriptionsFromCategory.productDescriptionFromCategory[c].id}
                            descriptionInfo={productDescriptionsFromCategory.productDescriptionFromCategory[c]}
                            deleteDescription={deleteDescriptionFromCategory}
                        />
                    )
            }

            for (let c = 0; c < productAddedCharacteristics.productCharacteristic.length; c++)
            {
                if (c % 2 === 0)
                    characteristicFromCategoryLeftSide.push(
                        <NewDescription
                            key={c}
                            charachteristicInfo={productAddedCharacteristics.productCharacteristic[c]}
                            deleteDescription={deleteAddedDescription}
                        />
                    )
            }

            return characteristicFromCategoryLeftSide;
        }
    }

    const generateDescriptionsFromCategoryRight = () =>
    {
        characteristicFromCategoryRightSide = [];
        if (productDescriptionsFromCategory.productDescriptionFromCategory !== undefined)
        {
            for (let c = 0; c < productDescriptionsFromCategory.productDescriptionFromCategory.length; c++)
            {
                if (c % 2 !== 0)
                {
                    characteristicFromCategoryRightSide.push(
                        <DescriptionOfCategory
                            key={productDescriptionsFromCategory.productDescriptionFromCategory[c].id}
                            descriptionInfo={productDescriptionsFromCategory.productDescriptionFromCategory[c]}
                            deleteDescription={deleteDescriptionFromCategory}
                        />
                    );
                }
            }

            for (let c = 0; c < productAddedCharacteristics.productCharacteristic.length; c++)
            {
                if (c % 2 !== 0)
                    characteristicFromCategoryRightSide.push(
                        <NewDescription
                            key={c}
                            charachteristicInfo={productAddedCharacteristics.productCharacteristic[c]}
                            deleteDescription={deleteAddedDescription}
                        />
                    )
            }

            return characteristicFromCategoryRightSide;
        }
    }

    const deleteDescriptionFromCategory = (id) =>
    {
        dispatch(deleteCharachteristicFormCategory(id))
        dispatch(setCharachteristicsValid(true))
    }

    const deleteAddedDescription = (blockId) =>
    {
        dispatch(deleteCharachteristic(blockId))
        dispatch(setCharachteristicsValid(true))
    }

    const addCharacteristic = () =>
    {
        var block = 0;
        if (productAddedCharacteristics.productCharacteristic.length > 0)
            block = productAddedCharacteristics.productCharacteristic[productAddedCharacteristics.productCharacteristic.length - 1].blockId;

        dispatch(addCharachteristic({
            blockId: block + 1,
            name: '',
            about: ''
        }));
    }
    //#endregion


    const cancelAddProduct = () =>
    {
        dispatch(resetProduct());
        navigate('/admin/main/products')
    }

    const confirmAddProduct = async () =>
    {
        setLoading(true);
        for (let i = 0; i < charachteristicsFromCategory.length; i++)
        {
            if (charachteristicsFromCategory[i].about === undefined || charachteristicsFromCategory[i].about === '')
            {
                dispatch(setCharachteristicsValid(false))
            }
        }
        for (let i = 0; i < charachteristics.length; i++)
        {
            if (charachteristics[i].name === '' || charachteristics[i].about === '')
            {
                dispatch(setCharachteristicsValid(false))
            }
        }

        if (charachteristicsValid)
        {
            var pictures = [];
            for (var i = 0; i < pictureFiles.length; i++)
            {
                let picture = await upload(pictureFiles[i].pictureFile)
                pictures.push({
                    address: picture.data.display_url,
                    deleteURL: picture.data.delete_url,
                    isTitle: pictureFiles[i].isTitle,
                })
            }

            try
            {
                await dispatch(addProduct(pictures)).unwrap();
                setLoading(false);

                navigate('/admin/main/products');
                setTimeout(() =>
                {
                    dispatch(hideSuccessfulAlert());
                }, 1000);
            }
            catch (error)
            {
                setLoading(false);

                setTimeout(() =>
                {
                    dispatch(hideUnsuccessfulAlert());
                }, 2000);
            }
        }
    }


    if (loading)
    {
        return <img style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} src={LoadingIcon} alt="loading" />
    }
    return (
        <Fragment>
            {
                unsuccessfulAlertShow &&
                <div className='modal-backdrop'>
                    <UnsuccessfulNotification notifiaction={actionNotification} />
                </div>
            }

            <div className="add-product-main-container">
                {
                    !productCharacteristics && (
                        <Fragment>
                            <div className="top-add-product-container">
                                <div className='add-product-left-side-container-1'>

                                    <RecursedCombo
                                        onCategoryClick={selectCategory}
                                        mainCategories={mainCategories}
                                        subCategories={subCategories}
                                        category={category}
                                    />

                                    <div className='add-product-name-container'>
                                        <label>Бренд</label>
                                        <select
                                            id='scrollbar-style-2'
                                            className='select-option-add-product'
                                            onChange={handleSelectBrand}
                                        >
                                            <option disabled ></option>
                                            {
                                                allBrands.map((brand) => (
                                                    <option
                                                        selected={brand.id === Number(manufacturerId)}
                                                        key={brand.id} value={brand.id}>{brand.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className='add-product-right-side-container-1'>
                                    <div className='add-product-name-container'>
                                        <label htmlFor="product-name-input">Назва</label>
                                        <input
                                            style={{
                                                border: !nameValid ? '1px solid red' : 'none',
                                            }}
                                            className='product-add-name'
                                            type='text'
                                            id='product-name-input'
                                            value={name}
                                            onChange={(event) =>
                                            {
                                                if (!nameValid)
                                                {
                                                    dispatch(setNameValid(true))
                                                }
                                                setName(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='add-product-name-container'>
                                        <label>Країна виробник</label>
                                        <select
                                            id='scrollbar-style-2'
                                            className='select-option-add-product'
                                            onChange={handleSelectCountry}>
                                            <option disabled ></option>
                                            {allCountries.map((country) => (
                                                <option
                                                    selected={country.id === Number(manufacturerCountryId)}
                                                    key={country.id}
                                                    value={Number(country.id)}
                                                >{country.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div className="color-price-add-product-container">
                                <div className='add-color-price-product-btn-container'>
                                    <button className="add-color-price-product-btn" onClick={() => addColorPrice()}> + </button>
                                    {!colorValid && <label>Кольори мають бути унікальними</label>}
                                </div>
                                {
                                    generateColorBlocks()
                                }
                            </div>


                            <div className='discout-code-add-product-container'>

                                <DiscountAmountInput
                                    percentAmount={percentAmount}
                                    onPercentAmountChange={handlePercentAmountChange}
                                />

                                <DiscountRangePicker
                                    startDiscountDate={startDiscount}
                                    onStartDateChange={handleStartDateChange}
                                    endDiscountDate={endDiscount}
                                    onEndDateChange={handleEndDateChange}
                                />

                                <div className='add-product-number-container'>
                                    <label>Код</label>
                                    <div className='add-product-number-input-container'>
                                        <input
                                            className='add-product-number-input'
                                            type='number'
                                            onKeyDown={handlerKeyDown}
                                            value={code}
                                            onChange={(event) =>
                                            {
                                                if (!codeValid)
                                                    dispatch(setCodeValid(true))

                                                setCode(event.target.value);
                                            }}
                                            style={{
                                                border: codeValid ? 'none' : '1px solid red'
                                            }}
                                        />
                                        {!codeValid && <label>Мінімум 4 цифри</label>}
                                    </div>

                                </div>

                                <div className='add-product-recommend-container'>

                                    <label className="add-product-recommend-custom-checkbox">
                                        <input type="checkbox" checked={isInBestProducts}
                                            onChange={() =>
                                            {
                                                dispatch(setIsInBestProducts(!isInBestProducts))
                                            }} />
                                        <span className="checkmark"><GreenCheckCheckboxIcon /></span>
                                        <label>Рекомендувати</label>
                                    </label>
                                </div>
                            </div>

                            <div className='top-add-product-container'>
                                <div className='add-product-left-side-container-4'>

                                    <div className='main-picture-div'>
                                        <img id="main-picture-add-product" className='add-product-main-image' src={mainPicturePath.picturePath}
                                            onError={hideImg} alt="" />
                                        <button className='add-product-add-picture-btn' onClick={openFileManager}>Додати світлину</button>
                                        <input type='file' id='file'
                                            ref={inputFile}
                                            style={{ display: 'none' }}
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={getPicture} />
                                    </div>
                                    <span
                                        className='error-label'
                                        style={{
                                            display: pictureValidity ? 'none' : 'inline'
                                        }}>Виберіть принаймні одну фотографію!</span>
                                    <div className='pictures-slider-container' id='scrollbar-style-2' onWheel={(evt) => { scrollHandler(evt) }}>
                                        {
                                            generatePicturesBlocks()
                                        }
                                    </div>
                                </div>
                                <div className='add-product-right-side-container-5'>
                                    <div className='add-product-description-container'>
                                        <textarea
                                            id='scrollbar-style-2'
                                            value={description}
                                            className='add-product-description'
                                            onChange={(event) =>
                                            {
                                                if (!descriptionValid)
                                                    dispatch(setDescriptionValid(true))
                                                setDescription(event.target.value)
                                            }}
                                            placeholder='Опис товару'

                                        />
                                        {!descriptionValid && <label className='error-label'>Опис повинен містити мінімум 20 символів!</label>}
                                    </div>

                                    <button className='add-product-add-characteristic-btn'
                                        onClick={goToCharacteristics}>Додати характеристику товару</button>
                                </div>
                            </div>
                        </Fragment>
                    )
                }

                {
                    productCharacteristics && (
                        <Fragment>
                            <label className='back-to-main-product-button' onClick={() =>
                            {
                                setProductCharacteristics(false)

                            }}><BackIcon /></label>
                            <h3 className='full-category-path'>{categoryFullPath}</h3>

                            <button className="add-color-price-product-btn" onClick={addCharacteristic}>+</button>
                            <div className='descriptions-container'>
                                <div className='descriptions-column-container'>
                                    {
                                        generateDescriptionsFromCategoryLeft()
                                    }
                                </div>
                                <div className='descriptions-column-container'>
                                    {
                                        generateDescriptionsFromCategoryRight()
                                    }
                                    <div className='add-product-confirmation-button'>
                                        <button className='add-product-cancel' onClick={cancelAddProduct}>Скасувати</button>
                                        <button className='add-product-confirm' onClick={confirmAddProduct}>Підтвердити</button>
                                    </div>
                                </div>

                            </div>

                            {
                                loading && (
                                    <img style={{
                                        width: '100px',
                                        height: '100px',
                                        position: 'absolute',
                                        alignSelf: 'center',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} src={LoadingIcon} alt="loading" />
                                )
                            }
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    )
}

export default ItemAddProduct;