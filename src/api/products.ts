import { api } from "@/lib/axios"

type GetProductsParams = {
  page: number
  perPage: number
}

type SearchProductsParams = GetProductsParams & {
  name?: string
  id?: string
  external?: boolean,
  withDeleted?: boolean
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
  isExternal?: boolean
  createdAt: Date
  deletedAt?: Date
}

export type ProductsModel = {
  data: {
    data: ProductModel[]
    total: number
  },
}

export type ProductsModelApplication = {
  data: ProductModel[]
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

export async function searchProducts({ page, perPage, name, id, external, withDeleted }: SearchProductsParams): Promise<ProductsModelApplication> {
  console.log(page, perPage, name, id, external, withDeleted);

  const response = await api.get<ProductsModel>('/products/search', {
    params: {
      page: page,
      perPage: perPage ?? 10,
      id: id ?? null,
      name: name ?? null,
      external: external ?? null,
      withDeleted: withDeleted ?? null,
    },
  })
  return response.data.data
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

export async function loadDataProducts() {
  await api.post(`/products/load`)
}

export async function deleteAllProducts() {
  await api.delete(`/products`)
}