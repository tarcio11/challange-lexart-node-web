"use client";
import { ListFilter, Loader2, PlusCircle } from "lucide-react";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/pagination";
import { useEffect, useState } from "react";
import { getProducts, getProductsExternal, ProductModel } from "@/api/products";
import { Dialog } from "@/components/ui/dialog";
import { CreateProductModal } from "../components/create-product-modal";
import { ProductTableRow } from "./product-table-row";

type ProductsModel = {
  data: ProductModel[];
  total: number;
};

export const ProductTabFilter = () => {
  const [type, setType] = useState<"all" | "external">("all");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<ProductsModel>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  function handlePaginate(pageIndex: number) {
    setPage(pageIndex);
  }

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const products = type === "all"
      ? await getProducts({ page, perPage: 10 })
      : await getProductsExternal({ page, perPage: 10 });
      setProducts(products.data as any);
      setLoading(false);
    }
    fetchProducts().then();
  }, [page, isProductModalOpen, type, isUpdateProductModalOpen, isDeleteProductModalOpen]);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setType("all")}>
            Todos
          </TabsTrigger>
          <TabsTrigger value="external" onClick={() => setType("external")}>
            Externos
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtrar
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
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
      <TabsContent value={type}>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Produtos
              {loading && (
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
                {!loading &&
                  products.data.length > 0 &&
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
              totalItems={products.total}
              onPageChange={handlePaginate}
            />
          </CardFooter>
        </Card>
      </TabsContent>

      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <CreateProductModal closeModal={() => setIsProductModalOpen(false)} />
      </Dialog>
    </Tabs>
  );
};
