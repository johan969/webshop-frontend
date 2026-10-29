import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`*/auth/me`, () => {
    return HttpResponse.json({
      id: 1,
      username: 'testuser@email.com',
      roles: ['ROLE_USER'],
      expiresIn: 3600,
      authenticated: true,
    });
  }),

  http.get(`*/products`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Laptop',
        price: 9999,
      },
      {
        id: 2,
        name: 'Tangentbord',
        price: 499,
      },
    ]);
  }),
];