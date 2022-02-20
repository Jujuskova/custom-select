import { StockT, SizeT } from 'types/products'

export type CustomSelectOptionT = {
  label: string
  value: any
  stock: number
}

export function defineQuantityPhrasing(quantity: number): string {
  if (quantity === 0) return 'Rupture de stock'

  return quantity < 10 ? `Seulement ${quantity} restant !` : 'En stock'
}

export function formatProductSizeOptions(
  productSize: StockT,
): CustomSelectOptionT[] {
  const options = Object.entries(productSize).map(([size, quantity]) => ({
    label: size,
    value: size,
    stock: quantity,
  }))

  return options
}

function getSelectContainer(id: string) {
  return document.getElementById(`container-${id}`)
}

function createListContainer(id: string) {
  const container = getSelectContainer(id)
  const ul = document.createElement('ul')
  ul.id = `${id}-list`
  ul.classList.add('options-hidden-container', 'hide')
  container?.append(ul)

  return ul
}

function createListItemElement(
  size: string,
  quantityLabel: string,
  price: string,
) {
  const li = document.createElement('li')
  li.classList.add('options-hidden-item')
  li.innerHTML = `<p>${size}</p> <p>${quantityLabel}</p> <p>${price}</p>`

  return li
}

export const addDataAttributeToOptionLabel = (
  id: string,
  onClickOption: (value?: SizeT) => void,
): void => {
  const docSelectOptions = document.getElementById(id)?.childNodes

  if (docSelectOptions?.length) {
    const ul = createListContainer(id)

    docSelectOptions.forEach((op: any) => {
      const { stock, price } = op.dataset || {}
      if (!stock) return

      const size = op.innerText
      const quantityLabel = defineQuantityPhrasing(Number(stock))

      const li = createListItemElement(size, quantityLabel, price)

      if (stock > 0) {
        li.addEventListener('click', () => {
          const newSize = op.value || undefined
          onClickOption(newSize)
          ul.classList.toggle('hide')
        })
      } else {
        li.classList.add('disabled')
      }

      ul.appendChild(li)
    })
  }
}
