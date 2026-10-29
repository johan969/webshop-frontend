import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const authResponse = await fetch(
          'http://localhost:8084/auth/me',
        );

        if (!authResponse.ok) {
          throw new Error('Du måste vara inloggad.');
        }

        const user = await authResponse.json();

        if (!user.authenticated) {
          throw new Error('Du måste vara inloggad.');
        }

        const response = await fetch(
          'http://localhost:8084/products',
        );

        if (!response.ok) {
          throw new Error('Kunde inte hämta produkterna.');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch {
        setError('Kunde inte hämta produkterna.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h1>Produkter</h1>

      {products.map((product) => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price} kr</p>
        </article>
      ))}
    </section>
  );
}