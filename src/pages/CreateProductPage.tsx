import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { CreateProduct } from "../service/productService";
import { CreateProductData } from "../types/product-cart";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const HandleSubmit = async (product: CreateProductData) => {

    try{
        await CreateProduct(product);
        navigate("/admin");

    } catch (error: any) {
        console.error("Error creating product:", error.message);
    }
  };

  return (
    <main className="admin-product-page">
      <div className="create-product-page-header">
        <h1>Skapa produkt </h1>
      </div>

      <ProductForm onSubmit={HandleSubmit} />
    </main>
  );
}
