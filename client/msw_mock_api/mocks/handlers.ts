import { LoginResponseDto } from '@/features/auth/LoginResponseDto';
import { rest } from 'msw';
import spritesJson from '../jsons/sprites.json';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjQxNjczOTYyLCJleHAiOjE2NDE3NjAzNjIsImp0aSI6ImE1YWMxZmNkLWNmMjQtNGI4OC04OWY4LTZjNTg5NDVjYjQxYSJ9.3zZFQDMe4EeUvb-yBcTRkLXfMzhDVAKn0HGsRmJF0WE';

const testUser = {
  email: 'user1@test.com',
  password: '123456',
};

interface UserRequest {
  user: {
    email: string;
    password: string;
  };
}

const isAuthorized = (req: Request) => {
  const authHeader = req.headers.get('Authorization');

  return authHeader?.endsWith(token);
};

export const handlers = [
  rest.post<UserRequest>('/api/v1/auth/login', async (req, res, ctx) => {
    const { user } = req.body;

    if (user.email === testUser.email && user.password === testUser.password) {
      const header = ctx.set('Authorization', `Bearer ${token}`);
      const loginResponse: LoginResponseDto = {
        data: {
          attributes: {
            email: user.email,
          },
        },
      };
      return res(header, ctx.json(loginResponse));
    } else {
      return res(ctx.json('not successful login'));
    }
  }),

  rest.get('/api/sprite/name/:spriteName', async (req, res, ctx) => {
    const { spriteName } = req.params;

    const sprite = spritesJson.sprites.find((s) => s.name === spriteName);

    return res(ctx.json(sprite));
  }),

  rest.get('/api/v1/sprite_sheet', async (_req, res, ctx) => {
    const sprites = spritesJson.sprites;

    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json('Login required.'));
    }

    return res(ctx.json(sprites));
  }),
];
