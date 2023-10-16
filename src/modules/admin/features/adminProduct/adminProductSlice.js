import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from 'reselect';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    category: {
        id: null,
        name: 'Категорії'
    },

    productName: '',
    productCode: -1,
    manufacturerCountryId: -1,
    manufacturerId: -1,
    productDescription: '',
    categoryFullPath: '',
    allBrands: [],
    allCountries: [],
    allColors: [],
    productSale: {},
    isInBestProducts: false,
    productColorPrice: [],
    charachteristicsFromCategory: [],
    charachteristics: [],
    messageFromServer: '',
    categoryValid: true,
    nameValid: true,
    colorValid: true,
    codeValid: true,
    descriptionValid: true,
    charachteristicsValid: true,
    successfulAlertShow: false,
    unsuccessfulAlertShow: false,
    actionNotification: '',
    filteredProducts: [],
    allProductCount: 0,
    allProducts: [],
    loading: false,
}

export const getProduct = createAsyncThunk('adminProducts/getProduct', async (id, { rejectWithValue }) =>
{
    const response = await axios.get(REACT_APP_BASE_URL + '/Product/product/' + id);
    return response.data
})

export const addProduct = createAsyncThunk('adminProducts/addProduct', async (_, { rejectWithValue, getState }) =>
{
    try
    {
        const state = getState();
        var descriptions = [];

        for (var i = 0; i < state.adminProducts.charachteristicsFromCategory.length; i++)
        {
            descriptions.push(
                {
                    name: state.adminProducts.charachteristicsFromCategory[i].name,
                    about: state.adminProducts.charachteristicsFromCategory[i].about
                }
            )
        }


        for (var i = 0; i < state.adminProducts.charachteristics.length; i++)
        {
            descriptions.push(
                {
                    name: state.adminProducts.charachteristics[i].name,
                    about: state.adminProducts.charachteristics[i].about
                }
            );
        }

        var productColors = [];
        for (let i = 0; i < state.adminProducts.productColorPrice.length; i++)
        {
            productColors.push(
                {
                    colorId: state.adminProducts.productColorPrice[i].colorId,
                    price: state.adminProducts.productColorPrice[i].price,
                    quantity: state.adminProducts.productColorPrice[i].quantity
                }
            )
        }

        var pictures = [
            {
                address: 'string',
                isTitle: true
            }
        ]

        var sale = null;

        if (state.adminProducts.productSale.percent !== undefined
            && state.adminProducts.productSale.percent > 0
            && state.adminProducts.productSale.startDate !== undefined
            && state.adminProducts.productSale.endDate !== undefined)
        {
            sale = {
                discountPercent: Number(state.adminProducts.productSale.percent),
                startDate: new Date(state.adminProducts.productSale.startDate),
                endDate: new Date(state.adminProducts.productSale.endDate)
            }
        }

        const product = {
            name: state.adminProducts.productName,
            code: state.adminProducts.productCode,
            manufacturerCountryId: state.adminProducts.manufacturerCountryId,
            manufacturerId: state.adminProducts.manufacturerId,
            categoryId: state.adminProducts.category.id,
            description: state.adminProducts.productDescription,
            sale: sale,
            isInBestProducts: state.adminProducts.isInBestProducts,
            pictures: pictures,
            descriptions: descriptions,
            productColors: productColors
        }

        const response = await axios.post(REACT_APP_BASE_URL + '/Product/addProduct', product);
        return response.data
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
        if (error.response.status === 400)
        {
            console.log(error.response)

            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }

})

export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async (args, { rejectWithValue, getState }) =>
{
    try
    {
        const state = getState();
        var descriptions = [];

        for (var i = 0; i < state.adminProducts.charachteristics.length; i++)
        {
            if (!state.adminProducts.charachteristics[i].id)
                descriptions.push(
                    {
                        name: state.adminProducts.charachteristics[i].name,
                        about: state.adminProducts.charachteristics[i].about
                    }
                )
            else
                descriptions.push(
                    {
                        id: state.adminProducts.charachteristics[i].id,
                        name: state.adminProducts.charachteristics[i].name,
                        about: state.adminProducts.charachteristics[i].about
                    }
                )
        }


        var productColors = [];
        for (let i = 0; i < state.adminProducts.productColorPrice.length; i++)
        {
            productColors.push(
                {
                    colorId: state.adminProducts.productColorPrice[i].colorId,
                    price: state.adminProducts.productColorPrice[i].price,
                    quantity: state.adminProducts.productColorPrice[i].quantity
                }
            )
        }

        var pictures = [
            {
                id: 77,
                address: 'string',
                isTitle: true
            }
        ]

        var sale = null;

        if (
            state.adminProducts.productSale.discountPercent !== undefined
            && state.adminProducts.productSale.startDate !== undefined
            && state.adminProducts.productSale.endDate !== undefined)
        {
            sale = {
                id: Number(state.adminProducts.productSale.id),
                discountPercent: Number(state.adminProducts.productSale.discountPercent),
                startDate: new Date(state.adminProducts.productSale.startDate),
                endDate: new Date(state.adminProducts.productSale.endDate)
            }
        }

        const product = {
            id: Number(args),
            name: state.adminProducts.productName,
            code: state.adminProducts.productCode,
            manufacturerCountryId: Number(state.adminProducts.manufacturerCountryId),
            manufacturerId: Number(state.adminProducts.manufacturerId),
            categoryId: state.adminProducts.category.id,
            description: state.adminProducts.productDescription,
            sale: sale,
            isInBestProducts: state.adminProducts.isInBestProducts,
            pictures: pictures,
            descriptions: descriptions,
            colorDetails: productColors
        }

        const response = await axios.put(REACT_APP_BASE_URL + '/Product/updateProduct', product);
        return response.data
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
        if (error.response.status === 400)
        {
            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }

})

export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.delete(REACT_APP_BASE_URL + '/Product/deleteProduct', {
            params: { id: id },
        });
        return response.data
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
        if (error.response.status === 400)
        {
            const customError = {
                status: error.response.data.status,
                message: error.response.data.title,
                detail: error.response.data.title,
            };
            return rejectWithValue(customError)
        }
        const customError = {
            status: error.response.data.status,
            message: error.response.data.title,
            detail: error.response.data.detail,
        };
        return rejectWithValue(customError)
    }
})

export const filterProducts = createAsyncThunk('adminProducts/filterProducts', async (filter, { rejectWithValue, getState }) =>
{
    try
    {

        // const state = getState();
        // filter.category = state.adminProducts.category.id;
        const response = await axios.post(REACT_APP_BASE_URL + '/Product/search', filter);
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

export const allProductCount = createAsyncThunk('adminProducts/allProductCount', async (_, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Product/getAllCount');
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

export const getAllProducts = createAsyncThunk('adminProducts/allProducts', async (categoryId, { rejectWithValue }) =>
{
    const response = await axios.get(REACT_APP_BASE_URL + '/Product/getAllProducts', {
        params: { categoryId: categoryId },
    });
    return response.data;

})

export const getAllBrands = createAsyncThunk('adminProducts/getAllBrands', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getAllBrands');
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

export const getAllCountries = createAsyncThunk('adminProducts/getAllCountries', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getAllCountries');
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

export const getAllColors = createAsyncThunk('adminProducts/getAllColors', async (args, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getAllColors');
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

export const getCharacteristicsFromCategory = createAsyncThunk('adminProducts/getCharacteristicsFromCategory', async (id, { rejectWithValue }) =>
{
    try
    {
        const response = await axios.get(REACT_APP_BASE_URL + '/Admin/getDescriptionsByCategory', {
            params: { categoryId: id },
        });
        return response.data;
    }
    catch (error)
    {
        if (error.code === 'ERR_NETWORK')
        {
            const customError = {
                status: 500,
                message: "Відсутнє з'єднання",
                detail: 'Немає підключення до серверу',
            };

            return rejectWithValue(customError);
        }
    }
})

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        setCategory: (state, { payload }) =>
        {
            return {
                ...state,
                category: payload
            }
        },
        setFullCategoryPath: (state, { payload }) =>
        {
            return {
                ...state,
                categoryFullPath: payload,
            }
        },
        setProductName: (state, { payload }) =>
        {
            return {
                ...state,
                productName: payload,
            }
        },
        setProductCode: (state, { payload }) =>
        {
            return {
                ...state,
                productCode: payload,
            }
        },
        setManufacturerCountry: (state, { payload }) =>
        {
            return {
                ...state,
                manufacturerCountryId: payload,
            }
        },
        setManufacturer: (state, { payload }) =>
        {
            return {
                ...state,
                manufacturerId: payload,
            }
        },
        setDescriptions: (state, { payload }) =>
        {
            return {
                ...state,
                productDescription: payload,
            }
        },
        setSale: (state, { payload }) =>
        {
            return {
                ...state,
                productSale: payload,
            }
        },
        setIsInBestProducts: (state, { payload }) =>
        {
            return {
                ...state,
                isInBestProducts: payload,
            }
        },
        addColorPriceBlock: (state, { payload }) =>
        {
            const newColorPriceBlock = payload;
            const updatedProductColorPrice = [...state.productColorPrice, newColorPriceBlock];
            return {
                ...state,
                productColorPrice: updatedProductColorPrice
            };
        },
        updateColorPriceBlock: (state, { payload }) =>
        {
            const updatedBlocks = state.productColorPrice.map((block) =>
            {
                if (block.blockId === payload.blockId)
                {
                    return {
                        ...block,
                        colorId: payload.colorId,
                        quantity: payload.quantity,
                        price: payload.price,
                    };
                }
                return block;
            });

            return {
                ...state,
                productColorPrice: updatedBlocks,
            };

        },
        deleteColorPriceBlock: (state, { payload }) =>
        {
            const filteredProductColorPrice = state.productColorPrice.filter((block) => block.blockId !== payload);
            return {
                ...state, productColorPrice: filteredProductColorPrice
            }
        },
        updateCharacteristicFromCategory: (state, { payload }) =>
        {
            const updatedCharachteristic = state.charachteristicsFromCategory.map((charachteristic) =>
            {
                if (charachteristic.id === payload.id)
                {
                    return {
                        ...charachteristic,
                        id: payload.id,
                        name: payload.name,
                        about: payload.about,
                    };
                }
                return charachteristic;
            });

            return {
                ...state,
                charachteristicsFromCategory: updatedCharachteristic,
            };

        },
        deleteCharachteristicFormCategory: (state, { payload }) =>
        {
            const filteredCharachteristicsFromCategory = state.charachteristicsFromCategory.filter((block) => block.id !== payload);

            return {
                ...state,
                charachteristicsFromCategory: filteredCharachteristicsFromCategory
            }
        },
        addCharachteristic: (state, { payload }) =>
        {
            const newCharacteristic = payload;
            const updatedCharachteristics = [...state.charachteristics, newCharacteristic];
            return {
                ...state,
                charachteristics: updatedCharachteristics
            };
        },
        updateCharachteristic: (state, { payload }) =>
        {
            const updatedCharachteristic = state.charachteristics.map((charachteristic) =>
            {
                if (charachteristic.blockId === payload.blockId)
                {
                    return {
                        ...charachteristic,
                        blockId: payload.blockId,
                        name: payload.name,
                        about: payload.about,
                    };
                }
                return charachteristic;
            });

            return {
                ...state,
                charachteristics: updatedCharachteristic,
            };
        },
        deleteCharachteristic: (state, { payload }) =>
        {
            const filteredCharachteristics = state.charachteristics.filter((block) => block.blockId !== payload);
            return {
                ...state,
                charachteristics: filteredCharachteristics
            }
        },
        charachteristicsReset: (state) =>
        {
            return {
                ...state,
                charachteristics: []
            }
        },
        resetProduct: (state) =>
        {
            return {
                ...state,
                productName: '',
                productCode: -1,
                manufacturerCountryId: 1,
                manufacturerId: 1,
                productDescription: '',
                productSale: {},
                allColors: [],
                allCountries: [],
                allBrands: [],
                productColorPrice: [
                    {
                        blockId: 0,
                        colorId: 1,
                        price: 0,
                        quantity: 0,
                    }
                ],
                categoryFullPath: '',
                charachteristics: [],
                charachteristicsFromCategory: [],

                allProductCount: 0,

                categoryValid: true,
                nameValid: true,
                colorValid: true,
                codeValid: true,
                descriptionValid: true,
                charachteristicsValid: true,
                isInBestProducts: false,
            }
        },
        resetColorPrice: (state) =>
        {
            return {
                ...state,
                productColorPrice: [],
            }
        },
        resetAllProducts: (state) =>
        {
            return {
                ...state,
                allProducts: [],
            }
        },
        resetFilteredProducts: (state) =>
        {
            return {
                ...state,
                filteredProducts: [],
            }
        },
        resetCategory: (state) =>
        {
            return {
                ...state,
                category: {
                    id: null,
                    name: 'Категорії'
                },
            }
        },
        setCategoryValid: (state, { payload }) =>
        {
            return {
                ...state,
                categoryValid: payload,
            }
        },
        setNameValid: (state, { payload }) =>
        {
            return {
                ...state,
                nameValid: payload,
            }
        },
        setColorValid: (state, { payload }) =>
        {
            return {
                ...state,
                colorValid: payload,
            }
        },
        setCodeValid: (state, { payload }) =>
        {
            return {
                ...state,
                codeValid: payload,
            }
        },
        setDescriptionValid: (state, { payload }) =>
        {
            return {
                ...state,
                descriptionValid: payload,
            }
        },
        setCharachteristicsValid: (state, { payload }) =>
        {
            return {
                ...state,
                charachteristicsValid: payload,
            }
        },
        hideSuccessfulAlert: (state) =>
        {
            return {
                ...state,
                successfulAlertShow: false
            }
        },
        hideUnsuccessfulAlert: (state) =>
        {
            return {
                ...state,
                unsuccessfulAlertShow: false
            }
        },
    },
    extraReducers(builder)
    {
        builder
            .addCase(addProduct.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Товар успішно додано!'
                }
            })
            .addCase(addProduct.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail
                }
            })
            .addCase(deleteProduct.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteProduct.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    loading: false,
                    actionNotification: 'Товар успішно видалено!'
                }
            })
            .addCase(deleteProduct.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    loading: false,
                    actionNotification: payload.detail
                }
            })
            .addCase(getAllBrands.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allBrands: payload,
                }
            })
            .addCase(getAllCountries.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allCountries: payload,
                }
            })
            .addCase(getAllColors.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allColors: payload,
                }
            })
            .addCase(getCharacteristicsFromCategory.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    charachteristicsFromCategory: payload,
                }
            })
            .addCase(filterProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    filteredProducts: payload,
                }
            })
            .addCase(allProductCount.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allProductCount: payload,
                }
            })
            .addCase(getAllProducts.pending, (state) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllProducts.fulfilled, (state, { payload }) =>
            {
                return {
                    ...state,
                    allProducts: payload,
                    loading: false,
                }
            })
            .addCase(getProduct.pending, (state, { payload }) =>
            {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getProduct.fulfilled, (state, { payload }) =>
            {

                var productColors = payload.productColors.map((col, index) =>
                {
                    return {
                        blockId: index,
                        colorId: col.colorId,
                        price: col.price,
                        quantity: col.quantity,
                    }
                })

                var productCharachteristics = payload.descriptions.map((characteristic, index) =>
                {
                    return {
                        ...characteristic,
                        blockId: index,
                        name: characteristic.name,
                        about: characteristic.about,
                        update: true,
                    }
                })

                //Pictures to receive from server

                return {
                    ...state,
                    loading: false,
                    category: payload.category,
                    manufacturerId: payload.manufacturer.id,
                    manufacturerCountryId: payload.manufacturerCountry.id,
                    productName: payload.name,
                    productColorPrice: productColors,
                    productSale: payload.sale,
                    productCode: payload.code,
                    isInBestProducts: payload.isInBestProducts,
                    productDescription: payload.description,
                    charachteristics: productCharachteristics,
                }
            })
            .addCase(updateProduct.pending, (state, { payload }) =>
            {

            })
            .addCase(updateProduct.fulfilled, (state) =>
            {
                return {
                    ...state,
                    successfulAlertShow: true,
                    unsuccessfulAlertShow: false,
                    actionNotification: 'Товар успішно оновлено!',
                    loading: false,
                }
            })
            .addCase(updateProduct.rejected, (state, { payload }) =>
            {
                return {
                    ...state,
                    successfulAlertShow: false,
                    unsuccessfulAlertShow: true,
                    actionNotification: payload.detail,
                    loading: false,
                }
            })
    }
})

export const {
    setCategory,
    setFullCategoryPath,
    addColorPriceBlock,
    deleteColorPriceBlock,
    deleteCharachteristicFormCategory,
    addCharachteristic,
    updateColorPriceBlock,
    deleteCharachteristic,
    setProductName,
    setProductCode,
    setManufacturerCountry,
    setManufacturer,
    setDescriptions,
    setSale,
    setIsInBestProducts,
    updateCharacteristicFromCategory,
    updateCharachteristic,
    charachteristicsReset,

    resetProduct,
    resetColorPrice,
    resetAllProducts,
    resetFilteredProducts,
    resetCategory,

    setCategoryValid,
    setNameValid,
    setColorValid,
    setCodeValid,
    setDescriptionValid,
    setCharachteristicsValid,

    hideSuccessfulAlert,
    hideUnsuccessfulAlert,
} = adminProductsSlice.actions;

export const getFilteredProducts = createSelector(
    state => state.adminProducts.allProducts,
    (_, inputValue) => inputValue.toLowerCase(),
    (allProducts, inputValue) =>
    {
        return allProducts.filter(product =>
            [product.name, product.code, product.color].some(field => field.toLowerCase().includes(inputValue))
        );
    }
);

export default adminProductsSlice.reducer