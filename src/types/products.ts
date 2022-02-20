export type SizeT = 'S' | 'M' | 'L' | 'XL'

export type StockT = Record<SizeT, number>

export type ProductT = {
  id: number
  name: string
  description: string
  brand: string
  price: number
  stock: StockT
}
