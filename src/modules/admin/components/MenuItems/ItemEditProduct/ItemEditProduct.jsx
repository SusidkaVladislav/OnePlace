import React, { useEffect, useState, useRef, Fragment } from "react";
import { useParams, useNavigate } from 'react-router-dom'

//#region Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForSelect } from '../../../features/adminCategory/adminCategorySlice';
import
{
    getProduct,
    updateProduct,
    getAllBrands,
    getAllCountries,
    getAllColors,
    addColorPriceBlock,
    deleteColorPriceBlock,
    addCharachteristic,
    deleteCharachteristic,
    setProductName,
    setManufacturerCountry,
    setManufacturer,
    setDescriptions,
    setSale,
    setPictures,
    setIsInBestProducts,
    resetProduct,
    resetColorPrice,
    setProductCode,
    setNameValid,
    setColorValid,
    setCodeValid,
    setDescriptionValid,
    setCharachteristicsValid,
    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} from '../../../features/adminProduct/adminProductSlice';
//#endregion

//#region Components
import ColorPriceItem from '../ItemAddProduct/add-product-components/product-color-price/ColorPriceItem';
import DiscountAmountInput from '../ItemAddProduct/add-product-components/add-product-discount/DiscountAmountInput';
import DiscountRangePicker from '../ItemAddProduct/add-product-components/add-product-discount/DiscountRangePicker';
import NewDescription from '../ItemAddProduct/add-product-components/add-product-description/NewDescription';
//#endregion

//#region Icons
import LoadingIcon from '../../../../../svg/animations/LoadingAnimation.gif';
import BackIcon from '../../../../../svg/arrows/BackTextAndArrowIcon';
import CommonPicture from '../ItemAddProduct/add-product-components/add-product-pictures/CommonPicture';
import GreenCheckCheckboxIcon from '../../../../../svg/shared-icons/GreenCheckCheckboxIcon';
//#endregion
import ImgBBUpload from '../../../../../services/image-upload-service/ImgBBUpload';
import './ItemEditProductStyles.css';

const ItemEditProduct = () =>
{
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { upload } = ImgBBUpload();
    const [productId, setProductId] = useState(params.id)
    const [saleId, setSaleId] = useState(0);
    const [percentAmount, setPercentAmount] = useState(0);
    const [startDiscount, setStartDiscount] = useState(new Date());
    const [endDiscount, setEndDiscount] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState('');
    const [productCharacteristics, setProductCharacteristics] = useState(false);
    var characteristicFromCategoryLeftSide = [];
    var characteristicFromCategoryRightSide = [];
    const {
        category,
        allBrands,
        allCountries,
        allColors,
        productColorPrice,
        charachteristics,
        productName,
        productCode,
        manufacturerCountryId,
        manufacturerId,
        productDescription,
        productSale,
        isInBestProducts,
        nameValid,
        colorValid,
        codeValid,
        descriptionValid,
        productImages,
    } = useSelector(state => state.adminProducts);

    //#region Validation states
    const [colorValidity, setColorValidadity] = useState(true)
    //#endregion

    //#region Images


    const [mainPicturePath, setPicturePath] = useState();
    const inputFile = useRef(null);
    var [productPictures, setProductPictures] = useState();
    var images = [];

    const [imgFiles, setImageFiles] = useState([]);

    const hideImg = () =>
    {
        document.getElementById('main-picture-edit-product').style.display = "none";
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
                    let lastPictureBlockId = productPictures[productPictures.length - 1].blockId;
                    newPictureBlock = {
                        id: -1,
                        blockId: lastPictureBlockId + 1,
                        address: reader.result,
                        isTitle: false,
                    };

                    setImageFiles([...imgFiles, {
                        blockId: lastPictureBlockId + 1,
                        pictureFile: file,
                    }])
                }
                catch
                {
                    newPictureBlock = {
                        id: -1,
                        blockId: 0,
                        address: reader.result,
                        isTitle: false,
                    };

                    setImageFiles([...imgFiles, {
                        blockId: 0,
                        pictureFile: file,
                    }])
                }
                finally
                {
                    setProductPictures([...productPictures, newPictureBlock]);
                    dispatch(setPictures([...productPictures, newPictureBlock]))
                }
            }
            else
                setPicturePath(reader.result)

            document.getElementById('main-picture-edit-product').style.display = "block";
        };
    }

    const scrollHandler = (evt) =>
    {
        evt.target.scrollLeft += evt.deltaY;
    }

    const generatePicturesBlocks = () =>
    {
        for (let i = 0; i < productPictures.length; i++)
        {
            images.push(<CommonPicture
                srcPath={productPictures[i].address}
                pictureId={productPictures[i].blockId}
                onRemove={RemovePicture}
                onSetMain={setMainPicture} />)
        }

        return images;
    }

    const RemovePicture = (blockId) =>
    {
        const forDelete = productPictures.filter((block) => block.blockId === blockId)
        if (forDelete[0].address !== mainPicturePath)
        {
            const fileterFiles = imgFiles.filter((file) => file.blockId !== blockId)
            setImageFiles(fileterFiles)
            const filteredPictures = productPictures.filter((block) => block.blockId !== blockId);
            setProductPictures(filteredPictures)
            dispatch(setPictures(filteredPictures))
        }
    }

    const setMainPicture = (blockId) => 
    {
        productPictures = productPictures.map((pict) =>
        {
            let p = {
                blockId: pict.blockId,
                id: pict.id,
                address: pict.address,
                deleteURL: pict.deleteURL,
            }

            if (pict.blockId === blockId)
            {
                setPicturePath(pict.address)
                p.isTitle = true
            }
            else
            {
                p.isTitle = false
            }
            return p;
        })

        setProductPictures(productPictures)

        dispatch(setPictures(productPictures))
    }
    //#endregion

    var productAddedCharacteristics = {
        productCharacteristic: charachteristics
    }

    var blocks = [];

    useEffect(() =>
    {
        dispatch(resetProduct())

        dispatch(resetColorPrice())
        dispatch(getCategoriesForSelect())

        blocks = []
        dispatch(getAllBrands());
        dispatch(getAllCountries());
        dispatch(getAllColors());

        dispatch(getProduct(productId))
            .then(() =>
            {
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error('Failed to fetch data', error);
                setLoading(false);
                navigate(-1);
            });

    }, [])

    useEffect(() =>
    {
        setSaleId(productSale !== null ? productSale.id : null);
        setPercentAmount(productSale !== null ? productSale.discountPercent : 0);
        setStartDiscount(productSale !== null ? new Date(productSale.startDate) : new Date())
        setEndDiscount(productSale !== null ? new Date(productSale.endDate) : new Date())
        setDescription(productDescription)
        setProductPictures(productImages)

        let mainPicture = productImages.filter(img => img.isTitle === true);
        setPicturePath(mainPicture[0].address)
        productAddedCharacteristics = {
            productCharacteristic: charachteristics
        }

    }, [productSale, productDescription, charachteristics, productImages]);


    const handleSelectBrand = (event) =>
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturer(selectedValue));
    }

    const handleSelectCountry = (event) =>
    {
        const selectedValue = event.target.value;
        dispatch(setManufacturerCountry(selectedValue));
    };

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
                    colorId: allColors[allColors.length - 1].id,
                    price: 0,
                    quantity: 0,
                }
            ))
        }
    }

    const generateColorBlocks = () =>
    {
        for (let i = 0; i < productColorPrice.length; i++)
        {
            blocks.push(
                <ColorPriceItem
                    colors={allColors}
                    productColorsBlocks={productColorPrice[i]}
                    key={productColorPrice[i].blockId}
                    deleteColorPriceBlock={deleteBlock}
                    colorValidity={colorValidity}
                />)
        }

        return blocks;
    }

    const deleteBlock = (blockId) =>
    {
        if (productColorPrice.length >= 2)
        {
            dispatch(deleteColorPriceBlock(blockId));
            dispatch(setColorValid(true));
        }
    }

    const handlePercentAmountChange = (newPercentAmount) =>
    {
        setPercentAmount(newPercentAmount);
    };

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

    const handlerKeyDown = (event) =>
    {
        if (event.which === 69 || event.which === 189
            || event.which === 107 || event.which === 109
            || event.which === 190 || event.which === 187)
        {
            event.preventDefault();
        }
    }

    const goToCharacteristics = async () =>
    {
        dispatch(setDescriptions(description));

        dispatch(setSale(
            {
                id: saleId,
                discountPercent: percentAmount,
                startDate: new Date(startDiscount).toDateString(),
                endDate: new Date(endDiscount).toDateString(),
            }
        ));

        if (nameValidation() &&
            brandValidation() &&
            countryValidation() &&
            colorIdValidation() &&
            codeValidation() &&
            descriptionValidation()
        )
            setProductCharacteristics(true)
    }

    const nameValidation = () =>
    {
        if (productName.length < 2)
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
        if (productColorPrice[0].colorId === -1)
        {
            setColorValidadity(false)
            return false;
        }

        const colorIds = productColorPrice.map((block) => block.colorId);
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

    const codeValidation = () =>
    {
        if (productCode.length >= 4)
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

    const generateDescriptionsFromCategoryLeft = () =>
    {
        characteristicFromCategoryLeftSide = [];
        if (productAddedCharacteristics.productCharacteristic !== undefined)
        {
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
        if (productAddedCharacteristics.productCharacteristic !== undefined)
        {
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

    const deleteAddedDescription = (blockId) =>
    {
        dispatch(deleteCharachteristic(blockId))
        dispatch(setCharachteristicsValid(true))
    }

    const cancelUpdateProduct = () =>
    {
        navigate(-1);
    }

    const confirmUpdateProduct = async () =>
    {
        setLoading(true);
        let pictures = [];

        for (let i = 0; i < productPictures.length; i++)
        {
            let picture = {
                id: productPictures[i].id,
                isTitle: productPictures[i].isTitle
            }

            if (productPictures[i].id === -1)
            {
                let file = imgFiles.filter(f => f.blockId === productPictures[i].blockId)
                let uploadResult = await upload(file[0].pictureFile);

                picture.address = uploadResult.data.display_url
                picture.deleteURL = uploadResult.data.delete_url
            }
            else
            {
                picture.address = productPictures[i].address
                picture.deleteURL = productPictures[i].deleteURL
            }

            pictures.push(picture)
        }

        await dispatch(updateProduct({
            id: productId,
            pictures: pictures
        }));
        setLoading(false);
        navigate(-1);
        setTimeout(() =>
        {
            dispatch(hideSuccessfulAlert())
        }, 1000);
        setTimeout(() =>
        {
            dispatch(hideUnsuccessfulAlert())
        }, 2000);
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
        <div className="edit-product-main-container">
            {
                !productCharacteristics && (
                    <Fragment>

                        <div className="top-edit-product-container">
                            <div className='edit-product-left-side-container-1'>
                                <div className='edit-product-name-container'>
                                    <input
                                        disabled
                                        className='product-edit-category'
                                        type='text'
                                        id='product-name-input'
                                        value={category.name.charAt(0).toUpperCase() + category.name.slice(1) || ''}
                                    />
                                </div>

                                <div className='edit-product-name-container'>
                                    <label>Бренд</label>
                                    <select
                                        className='select-option-add-product'
                                        onChange={handleSelectBrand}
                                    >
                                        <option disabled ></option>
                                        {
                                            allBrands.map((brand) => (
                                                <option
                                                    selected={brand.id === Number(manufacturerId)}
                                                    key={brand.id} value={Number(brand.id)}>{brand.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className='edit-product-right-side-container-1'>
                                <div className='edit-product-name-container'>
                                    <label htmlFor="product-name-input">Назва</label>
                                    <input
                                        style={{
                                            border: !nameValid ? '1px solid red' : 'none',
                                        }}
                                        className='product-add-name'
                                        type='text'
                                        id='product-name-input'
                                        value={productName}
                                        onChange={(event) =>
                                        {
                                            if (!nameValid)
                                            {
                                                dispatch(setNameValid(true))
                                            }
                                            dispatch(setProductName(event.target.value))
                                        }}
                                    />
                                </div>
                                <div className='edit-product-name-container'>
                                    <label>Країна виробник</label>
                                    <select className='select-option-add-product' onChange={handleSelectCountry}>
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

                        <div className="color-price-edit-product-container">
                            <div className='add-color-price-product-btn-container'>
                                <button className="add-color-price-product-btn" onClick={() => addColorPrice()}> + </button>
                                {!colorValid && <label>Кольори мають бути унікальними</label>}
                            </div>
                            {
                                generateColorBlocks()
                            }
                        </div>

                        <div className='discout-code-edit-product-container'>
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
                            <div className='edit-product-number-container'>
                                <label>Код</label>
                                <div className='edit-product-number-input-container'>
                                    <input
                                        className='add-product-number-input'
                                        type='number'
                                        onKeyDown={handlerKeyDown}
                                        value={productCode}
                                        onChange={(event) =>
                                        {
                                            if (!codeValid)
                                                dispatch(setCodeValid(true))

                                            dispatch(setProductCode(event.target.value));
                                        }}
                                        style={{
                                            border: codeValid ? 'none' : '1px solid red'
                                        }}
                                    />
                                    {!codeValid && <label>Мінімум 4 цифри</label>}
                                </div>
                            </div>

                            <div className='edit-product-recommend-container'>
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

                        <div className='top-edit-product-container'>
                            <div className='edit-product-left-side-container-4'>
                                <div className='main-picture-div'>
                                    <img id="main-picture-edit-product" className='edit-product-main-image' src={mainPicturePath}
                                        onError={hideImg} alt="" />
                                    <button className='edit-product-add-picture-btn' onClick={openFileManager}>Додати світлину</button>
                                    <input
                                        type='file'
                                        id='file'
                                        ref={inputFile}
                                        style={{ display: 'none' }}
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={getPicture}
                                    />
                                </div>
                                <div className='pictures-slider-container' id='scrollbar-style-2' onWheel={(evt) => { scrollHandler(evt) }}>
                                    {
                                        generatePicturesBlocks()
                                    }
                                </div>
                            </div>
                            <div className='edit-product-right-side-container-5'>
                                <div className='edit-product-description-container'>
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
                                <button className='edit-product-add-characteristic-btn'
                                    onClick={goToCharacteristics}>Редагувати характеристики товару</button>
                            </div>
                        </div>
                    </Fragment>)
            }
            {
                productCharacteristics && (
                    <Fragment>
                        <label className='back-to-main-product-button' onClick={() => { setProductCharacteristics(false) }}><BackIcon /></label>
                        <button
                            className="add-color-price-product-btn"
                            onClick={addCharacteristic}
                        >+</button>

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
                                    <button className='add-product-cancel' onClick={cancelUpdateProduct}>Скасувати</button>
                                    <button className='add-product-confirm' onClick={confirmUpdateProduct}>Підтвердити</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}

        </div>
    )
}

export default ItemEditProduct;