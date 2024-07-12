"use client";
import { ProductModel } from "@/api/products";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { UpdateProductModal } from "./update-product-modal";
import { DeleteProductModal } from "./delete-product-modal";
import { DateUtils } from "@/utils/date";

export interface ProductTableRowProps {
  product: ProductModel;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (isOpen: boolean) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export const ProductTableRow = ({ isUpdateModalOpen, setIsUpdateModalOpen, isDeleteModalOpen, setIsDeleteModalOpen, product }: ProductTableRowProps) => {
  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">{product.isExternal ? 'Externo' : 'Interno'}</TableCell>
      <TableCell className="hidden md:table-cell">
        {DateUtils.formatDate(new Date(product.createdAt!))}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => setIsUpdateModalOpen(true)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setIsDeleteModalOpen(true)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <UpdateProductModal closeModal={() => setIsUpdateModalOpen(false)} product={product}/>
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DeleteProductModal closeModal={() => setIsDeleteModalOpen(false)} id={product.id}/>
      </Dialog>
    </TableRow>
  );
};
