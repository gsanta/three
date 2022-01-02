import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { SpriteSheet } from '../features/sprite/SpriteSheet';
import { Sprite } from '../models/Sprite';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

type Args = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
};

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<Args, unknown, unknown> =>
  async ({ url, method, data }: any) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const spriteApi = createApi({
  reducerPath: 'spriteApi',
  baseQuery: axiosBaseQuery({ baseUrl: '.' }),
  endpoints: (builder) => ({
    getSpriteByName: builder.query<AxiosResponse<Sprite>, string>({
      query: (name) => ({ url: `/api/sprite/${name}`, method: 'get' }),
    }),
    searchSprites: builder.query<SpriteSheet[], void>({
      query: () => ({ url: `/api/v1/sprite_sheet`, method: 'get' }),
    }),
  }),
});

export const { useGetSpriteByNameQuery, useSearchSpritesQuery } = spriteApi;
