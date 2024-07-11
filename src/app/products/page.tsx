"use client";
import { withAuth } from "@/components/with-auth";
import { ProductsTable } from "./components/product-table";

function Products() {
  return <ProductsTable />;
}

export default withAuth(Products);
