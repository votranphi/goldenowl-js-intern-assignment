export interface Product {
  id: string
  name: string
  thumbnail: string
  price: string
  images?: string[]
  details?: string
}

export interface ProductsResponse {
  products: {
    [key: string]: Product
  }
}
