import React, { useEffect } from 'react'
import {
  getProducts,
  productsSelector,
  productStatusSelector,
} from 'storeSlice/productSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { StoreStatusT } from 'types/store'
import Product from './Product'

function Products() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(productsSelector)
  const loadingState = useAppSelector(productStatusSelector)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="products-container">
      {[StoreStatusT.LOADING, StoreStatusT.INIT].includes(loadingState) && (
        <p>Loading products ...</p>
      )}
      {loadingState === StoreStatusT.FAILED && (
        <p>An error has occured, please try again...</p>
      )}

      {products.map(product => (
        <Product {...{ product }} key={product.id} />
      ))}
    </div>
  )
}

export default Products
