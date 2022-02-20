import { httpClient } from 'helpers/api'

export async function fetchProducts() {
  const url = '/products'

  const response = await httpClient.get(url)

  return response
}
