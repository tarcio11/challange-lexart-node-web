"use client";
import { withAuth } from "@/components/with-auth";
import { LogsProductsTable } from "./components/log-product-table";

function Logs() {
  return <LogsProductsTable />;
}

export default withAuth(Logs);
