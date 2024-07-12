"use client";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Pagination } from "@/components/pagination";
import { ProductModel, searchProducts } from "@/api/products";
import { LogsProductTableRow } from "./log-product-table-row";
import { z } from "zod";
import { LogsProductTableFilters } from "./log-product-table-filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const ProductTabFilter = () => {
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
        withDeleted: true,
      }),
  })

  console.log(products);


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <LogsProductTableFilters />
        <div className="ml-auto flex items-center gap-2">
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Logs de Produtos deletados
              {isFetchingProducts && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </CardTitle>
            <CardDescription>
              Visualize logs de produtos deletados
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
                    Data da exclusão
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isFetchingProducts && !isLoadingProducts && products &&
                  products.data.map((product: ProductModel) => (
                    <LogsProductTableRow
                    key={product.id}
                    product={product}
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
    </Tabs>
  );
};
