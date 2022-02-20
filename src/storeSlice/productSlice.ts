import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductT } from 'types/products'
import { StoreStatusT } from 'types/store'
import { RootState } from 'store'
import { fetchProducts } from 'api/fetchProducts'
import { normalize } from 'helpers/normalize'

export interface ProductState {
  products?: Record<number, ProductT[]>
  status: StoreStatusT
}

const initialState: ProductState = {
  products: undefined,
  status: StoreStatusT.INIT,
}

export const getProducts = createAsyncThunk('product/getProduct', async () => {
  const response = await fetchProducts()
  return response.data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProducts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = StoreStatusT.LOADING
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = StoreStatusT.SUCCESS
        state.products = normalize<ProductT[]>(action.payload, 'id')
      })
      .addCase(getProducts.rejected, state => {
        state.status = StoreStatusT.FAILED
      })
  },
})

export const { resetProducts } = productSlice.actions

/** SELECTORS */
export const productsSelector = (state: RootState) =>
  state.product.products
    ? (Object.values(state.product.products) as ProductT[])
    : []
export const productStatusSelector = (state: RootState) => state.product.status

export default productSlice.reducer
