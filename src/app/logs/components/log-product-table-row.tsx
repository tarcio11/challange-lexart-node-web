"use client";
import { ProductModel } from "@/api/products";
import { TableCell, TableRow } from "@/components/ui/table";
import { DateUtils } from "@/utils/date";

export interface LogsProductTableRowProps {
  product: ProductModel;
}

export const LogsProductTableRow = ({ product }: LogsProductTableRowProps) => {
  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">{product.isExternal ? 'Externo' : 'Interno'}</TableCell>
      <TableCell className="hidden md:table-cell">
        {DateUtils.formatDate(new Date(product.deletedAt!))}
      </TableCell>
    </TableRow>
  );
};
