import React, { useState } from 'react'
import CustomSelectSize from 'components/common/CustomSelectSize'
import { ProductT, SizeT } from 'types/products'
import { formatProductSizeOptions } from 'helpers/customSelectHelper'

type Props = {
  product: ProductT
}

function Product({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<SizeT | undefined>()

  const options = formatProductSizeOptions(product.stock)
  const amount = (product.price || 0).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })

  const handleSelectedSize = (size?: SizeT): void => {
    setSelectedSize(size)
  }

  return (
    <div className="product-container">
      <p className="product-name">{product.name}</p>
      <p className="product-amount">{amount}</p>
      <CustomSelectSize
        {...{ options }}
        id={`select-product-${product.id}`}
        onSelectElement={handleSelectedSize}
        value={selectedSize as string}
        placeholder="Sélectionner une taille"
        amount={amount}
      />
    </div>
  )
}

export default Product
