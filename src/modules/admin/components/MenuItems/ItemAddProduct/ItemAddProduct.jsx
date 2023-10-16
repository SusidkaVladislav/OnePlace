import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '../../../features/adminProduct/adminProductSlice';
//#endregion

//#region Services
import RecursedCombo from '../../../controls/recursed-combo-box/RecursedCombo';
import ColorPriceItem from './add-product-components/product-color-price/ColorPriceItem';
import DiscountAmountInput from './add-product-components/add-product-discount/DiscountAmountInput';
import DiscountRangePicker from './add-product-components/add-product-discount/DiscountRangePicker';
import DescriptionOfCategory from './add-product-components/add-product-description/DescriptionOfCategory';
import NewDescription from './add-product-components/add-product-description/NewDescription';
import Alert from '@mui/material/Alert';
//#endregion

//#region Icons
import CommonPicture from './add-product-components/add-product-pictures/CommonPicture';
import BackIcon from '../../../svg/sharedIcons/BackIcon';
//#endregion

import LoadingIcon from '../../../svg/sharedIcons/Dual Ring-1s-54px.gif';
import './ItemAddProductStyles.css';

const ItemAddProduct = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categoriesForSelect } = useSelector(state => state.adminCategories);
    var [productPictures, setProductPictures] = useState([]);
    const [description, setDescription] = useState('');
    const [mainPicturePath, setPicturePath] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [productCharacteristics, setProductCharacteristics] = useState(false);

    const [addConfairmation, setAddConfairmation] = useState(false)
    const [showCancelDialog, setshowCancelDialog] = useState(false)

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
        successfulAlertShow,
        unsuccessfulAlertShow,
        actionNotification, } = useSelector(state => state.adminProducts);

    const [percentAmount, setPercentAmount] = useState(productSale ? productSale.percent ? productSale.percent : 0 : 0);
    const [startDiscount, setStartDiscount] = useState(productSale ? productSale.startDate ? new Date(productSale.startDate) : new Date() : new Date());
    const [endDiscount, setEndDiscount] = useState(productSale ? productSale.endDate ? new Date(productSale.endDate) : new Date() : new Date());

    var productColorsBlocks = {
        productColorPriceBlock: productColorPrice
    }

    var productDescriptionsFromCategory = {
        productDescriptionFromCategory: charachteristicsFromCategory
    }

    var productAddedCharacteristics = {
        productCharacteristic: charachteristics
    }
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        dispatch(resetProduct())
        dispatch(resetAllProducts())
        dispatch(resetFilteredProducts())
        dispatch(resetCategory())
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



        if (manufacturerId === -1)
        {
            if (allBrands.length > 0)
                dispatch(setManufacturer(allBrands[0].id));
        }
        if (manufacturerCountryId === -1)
        {
            if (allCountries.length > 0)
                dispatch(setManufacturerCountry(allCountries[0].id));
        }

        dispatch(getAllBrands());
        dispatch(getAllCountries());
        dispatch(getAllColors());

        productAddedCharacteristics = {
            productCharacteristic: charachteristics
        }
    }, [])


    const selectCategory = async (id, name, fullPath) =>
    {
        dispatch(setCategory({ id: id, name: name }))
        dispatch(setFullCategoryPath(fullPath));
        dispatch(charachteristicsReset());
        dispatch(setCategoryValid(true));
        await dispatch(getCharacteristicsFromCategory(id));
    }

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
                    colorId: 1,
                    price: 0,
                    quantity: 0,
                }
            ))
            productColorsBlocks.productColorPriceBlock = productColorPrice;
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
            />)
        }

        return blocks;
    }

    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190 || event.which === 187)
        {
            event.preventDefault();
        }
    }

    const openFileManager = () =>
    {
        inputFile.current.click();
    }

    const getPicture = (event) =>
    {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
        {
            if (mainPicturePath.length > 0)
            {
                var newPictureBlock = {}

                try
                {
                    let lastPictureBlockId = productPictures[productPictures.length - 1].pictureBlockId;
                    newPictureBlock = {
                        pictureBlockId: lastPictureBlockId + 1,
                        picturePath: reader.result,
                    };
                }
                catch
                {
                    newPictureBlock = {
                        pictureBlockId: 0,
                        picturePath: reader.result,
                    };
                }
                finally
                {
                    setProductPictures([...productPictures, newPictureBlock]);
                }
            }
            else
                setPicturePath(reader.result)

            document.getElementById('main-picture-add-product').style.display = "block";
        };
    }

    const RemovePicture = (blockId) =>
    {
        const filteredPictures = productPictures.filter((block) => block.pictureBlockId !== blockId);
        setProductPictures(filteredPictures)
    }

    const setMainPicture = (blockId, srcPath) => 
    {
        var pictures = productPictures;
        var index = productPictures.findIndex(x => x.pictureBlockId === blockId);
        pictures[index].picturePath = mainPicturePath;
        setProductPictures(pictures)
        setPicturePath(srcPath);
    }

    const generatePicturesBlocks = () =>
    {
        for (let i = 0; i < productPictures.length; i++)
        {
            images.push(<CommonPicture
                srcPath={productPictures[i].picturePath}
                pictureId={productPictures[i].pictureBlockId}
                onRemove={RemovePicture}
                onSetMain={setMainPicture} />)
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

    const goToCharacteristics = async () =>
    {
        dispatch(setProductName(name));
        dispatch(setProductCode(code));
        dispatch(setDescriptions(description));

        dispatch(setSale({
            percent: percentAmount,
            startDate: startDiscount,
            endDate: endDiscount,
        }));

        if (categoryValidation() && nameValidation()
            && colorIdValidation() && codeValidation()
            && descriptionValidation())
            setProductCharacteristics(true)
    }

    function isEmpty(obj)
    {
        return Object.keys(obj).length === 0;
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
        const colorIds = productColorsBlocks.productColorPriceBlock.map((block) => block.colorId);
        const uniqueColorIds = new Set(colorIds);
        const areAllUnique = colorIds.length === uniqueColorIds.size;
        if (areAllUnique)
        {
            dispatch(setColorValid(true))
            return true;
        }
        else
        {
            dispatch(setColorValid(false))
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

    const cancelAddProduct = () =>
    {
        dispatch(resetProduct());
        navigate('/admin/main/products')
    }

    const confirmAddProduct = async () =>
    {
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
            await dispatch(addProduct());
            navigate('/admin/main/products')
        }
    }

    const handleSelectCountry = (event) =>
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturerCountry(selectedValue));
    };

    const handleSelectBrand = (event) =>
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturer(selectedValue));
    }



    const handlePercentAmountChange = (newPercentAmount) =>
    {
        setPercentAmount(newPercentAmount);
    };



    const handleStartDateChange = (newStartDate) =>
    {
        setStartDiscount(newStartDate)
    }

    const handleEndDateChange = (newEndDate) =>
    {
        setEndDiscount(newEndDate)
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
                                        className='select-option-add-product'
                                        onChange={handleSelectBrand}
                                    >
                                        <option disabled ></option>
                                        {
                                            allBrands.map((brand) => (
                                                <option
                                                    defaultValue={brand.id === Number(manufacturerId)}
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
                                    <select className='select-option-add-product' onChange={handleSelectCountry}>
                                        <option disabled ></option>
                                        {allCountries.map((country) => (
                                            <option
                                                defaultValue={country.id === Number(manufacturerCountryId)}
                                                key={country.id}
                                                value={country.id}
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
                                //discountDates={discountDates}
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
                                <input type='checkbox' checked={isInBestProducts} onChange={() =>
                                {
                                    dispatch(setIsInBestProducts(!isInBestProducts))
                                }} />
                                <label>Рекомендувати</label>
                            </div>
                        </div>

                        <div className='top-add-product-container'>
                            <div className='add-product-left-side-container-4'>
                                <div className='main-picture-div'>
                                    <img id="main-picture-add-product" className='add-product-main-image' src={mainPicturePath}
                                        onError={hideImg} alt="" />
                                    <button className='add-product-add-picture-btn' onClick={openFileManager}>Додати світлину</button>
                                    <input type='file' id='file'
                                        ref={inputFile}
                                        style={{ display: 'none' }}
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={getPicture} />
                                </div>

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
                                    {!descriptionValid && <label>Опис повинен містити мінімум 20 символів</label>}
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

                        {
                            successfulAlertShow &&
                            <Alert variant='filled'
                                severity="success"
                                sx={
                                    {
                                        width: 'fit-content',
                                        height: 'fit-content',
                                        minWidth: '433px',
                                        marginTop: '7%',
                                        marginLeft: '60%',
                                        position: 'absolute'
                                    }
                                }
                                onClose={() => { dispatch(hideSuccessfulAlert()) }}>{actionNotification}</Alert>
                        }
                        {
                            unsuccessfulAlertShow &&
                            <Alert value='filled'
                                severity="error"
                                sx={
                                    {
                                        width: 'fit-content',
                                        minWidth: '433px',
                                        height: 'fit-content',
                                        marginTop: '7%',
                                        marginLeft: '60%',
                                        position: 'absolute'
                                    }
                                }
                                onClose={() => { dispatch(hideUnsuccessfulAlert()) }}>{actionNotification}</Alert>
                        }

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

                    </Fragment>
                )
            }
        </div>
    )
}

export default ItemAddProduct;