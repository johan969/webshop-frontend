import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { ProductList } from '../components/ProductList';


describe('ProductList', () => {
  it('visar produkter för en inloggad användare', async () => {
    render(<ProductList />);

    expect(
      await screen.findByRole('heading', {
        name: 'Produkter',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Laptop' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Tangentbord' }),
    ).toBeInTheDocument();

    expect(screen.getByText('9999 kr')).toBeInTheDocument();
    expect(screen.getByText('499 kr')).toBeInTheDocument();
  });

  it('visar ett felmeddelande om produkthämtningen misslyckas', async () => {
    server.use(
      http.get(`*/products`, () => {
        console.log('Mocking products endpoint to return 500 error');
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 },
        );
      }),
    );

    render(<ProductList />);

    expect(
      await screen.findByRole('alert'),
    ).toHaveTextContent('Kunde inte hämta produkterna.');
  });
});