/* eslint-disable no-param-reassign */
import React, { HTMLAttributes, ChangeEvent, useEffect } from 'react'
import { SizeT } from 'types/products'
import {
  addDataAttributeToOptionLabel,
  CustomSelectOptionT,
} from 'helpers/customSelectHelper'

interface Props extends HTMLAttributes<HTMLElement> {
  onSelectElement(size?: SizeT): void
  options: CustomSelectOptionT[]
  value: string
  id: string
  amount: string
}

function CustomSelectSize({
  value,
  options,
  onSelectElement,
  placeholder,
  id,
  amount,
}: Props) {
  useEffect(() => {
    if (id) addDataAttributeToOptionLabel(id, onSelectElement)
  }, [])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value || undefined
    onSelectElement(newSize as SizeT)
  }

  const onMouseDown = (e: any) => {
    // stop native menu to open
    e.preventDefault()
    const listElement = document.getElementById(`${id}-list`)
    if (listElement) listElement.classList.toggle('hide')
  }

  return (
    <div id={`container-${id}`} className="custom-select-container">
      <select
        onChange={onChange}
        onMouseDown={onMouseDown}
        value={value}
        className="select-native-custom"
        id={id}
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option
            key={`${id}-${o.value}`}
            id={`${id}-${o.value}`}
            value={o.value}
            data-stock={o.stock}
            data-price={amount}
            disabled={!o.stock}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelectSize
