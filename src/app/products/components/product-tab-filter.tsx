"use client";
import { FileStack, ListCollapse, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import { ProductModel, searchProducts } from "@/api/products";
import { Dialog } from "@/components/ui/dialog";
import { CreateProductModal } from "../components/create-product-modal";
import { ProductTableRow } from "./product-table-row";
import { LoadDataProductsModal } from "./load-data-product-modal";
import { DeleteAllProductsModal } from "./delete-all-products-modal";
import { z } from "zod";
import { ProductTableFilters } from "./product-table-filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const ProductTabFilter = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [isLoadDataProductModalOpen, setIsLoadDataProductModalOpen] = useState(false);
  const [isDeleteAllProductsModalOpen, setIsDeleteAllProductsModalOpen] = useState(false);
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  const name = searchParams.get('name') ?? ''
  const external = z.coerce
    .string()
    .parse(searchParams.get('type') ?? 'all')
  const page = z.coerce
    .number()
    .parse(searchParams.get('page') ?? '1')

    function handlePaginate(pageIndex: number) {
      params.set('page', String(pageIndex))
      replace(`${pathname}?${params.toString()}`)
    }

  const {
    data: products,
    isFetching: isFetchingProducts,
    isLoading: isLoadingProducts,
  } = useQuery({
    queryKey: ['products/search', page, name, external],
    queryFn: () =>
      searchProducts({
        page,
        perPage: 10,
        name,
        external: external === 'all' ? undefined : true,
      }),
  })

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <ProductTableFilters />
        <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" variant="outline">
              <ListCollapse className="h-4 w-4" />
              Operações
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer flex gap-2"
              onClick={() => setIsLoadDataProductModalOpen(true)}
            >
              Carregar produtos <FileStack className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex gap-2"
              onClick={() => setIsDeleteAllProductsModalOpen(true)}
            >
              Excluir todos os produtos <Trash2 className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <Button
            size="sm"
            className="h-7 gap-1"
            onClick={() => setIsProductModalOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar produto
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Produtos
              {isFetchingProducts && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </CardTitle>
            <CardDescription>
              Gerencie seus produtos e veja as estatísticas de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Estoque
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Data de criação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isFetchingProducts && !isLoadingProducts && products &&
                  products.data.map((product: ProductModel) => (
                    <ProductTableRow
                    key={product.id}
                    product={product}
                    isUpdateModalOpen={isUpdateProductModalOpen}
                    setIsUpdateModalOpen={setIsUpdateProductModalOpen}
                    isDeleteModalOpen={isDeleteProductModalOpen}
                    setIsDeleteModalOpen={setIsDeleteProductModalOpen}
                  />
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="w-full">
            <Pagination
              currentPage={page}
              itemsPerPage={10}
              totalItems={products?.total!}
              onPageChange={handlePaginate}
            />
          </CardFooter>
        </Card>
      </TabsContent>

      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <CreateProductModal closeModal={() => setIsProductModalOpen(false)} />
      </Dialog>
      <Dialog open={isLoadDataProductModalOpen} onOpenChange={setIsLoadDataProductModalOpen}>
        <LoadDataProductsModal closeModal={() => setIsLoadDataProductModalOpen(false)} />
      </Dialog>
      <Dialog open={isDeleteAllProductsModalOpen} onOpenChange={setIsDeleteAllProductsModalOpen}>
        <DeleteAllProductsModal closeModal={() => setIsDeleteAllProductsModalOpen(false)} />
      </Dialog>
    </Tabs>
  );
};
