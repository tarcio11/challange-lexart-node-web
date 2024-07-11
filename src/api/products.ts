import { api } from "@/lib/axios"

type GetProductsParams = {
  page: number
  perPage: number
}

type CreateProductModel = {
  name: string
  price: number
  stock: number
}

type UpdateProductModel = CreateProductModel & {
  id: string
}

export type ProductModel = {
  id: string
  name: string
  price: number
  stock: number
  createdAt: Date
}

type ProductsModel = {
  data: ProductModel[],
  total: number
}

export async function getProducts({ page, perPage }: GetProductsParams): Promise<ProductsModel> {
  const response = await api.get<ProductsModel>('/products', {
    params: {
      page: page ?? 1,
      perPage: perPage ?? 10,
    },
  })
  return response.data
}

export async function getProductsExternal({ page, perPage }: GetProductsParams): Promise<ProductsModel> {
  const response = await api.get<ProductsModel>('/products/external', {
    params: {
      page: page,
      perPage: perPage ?? 10,
    },
  })
  return response.data
}

export async function createProduct(data: CreateProductModel) {
  await api.post('/products', data)
}

export async function updateProduct(data: UpdateProductModel) {
  await api.put(`/products/${data.id}`, data)
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`)
}