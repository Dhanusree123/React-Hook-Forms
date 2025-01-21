"use client";
import React from "react";
import ProductForm from "./components/ProductForm";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <ProductForm />
    </>
  );
}
