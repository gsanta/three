import { rest } from 'msw';
import spritesJson from '../jsons/sprites.json';

export const handlers = [
  rest.get('/api/sprite/name/:spriteName', async (req, res, ctx) => {
    const { spriteName } = req.params;
    console.log('the sprites', spritesJson.sprites);

    const sprite = spritesJson.sprites.find((s) => s.name === spriteName);

    return res(ctx.json(sprite));
  }),
  rest.get('/api/sprite/search', async (_req, res, ctx) => {
    const sprites = spritesJson.sprites;

    console.log('the sprites', sprites);

    // return res(ctx.json(sprites));

    return res(
      ctx.status(500),
      ctx.json({
        errorMessage: `Internal server error`,
      }),
    );
    // And a response body, if necessary

    // const url = 'sprites/player.png';

    // const imageBuffer = await fetch(url).then((imgRes) => imgRes.arrayBuffer());
    // return res(
    //   ctx.set('Content-Length', imageBuffer.byteLength.toString()),
    //   ctx.set('Content-Type', 'image/png'),
    //   // Respond with the "ArrayBuffer".
    //   ctx.body(imageBuffer),
    // );
  }),
];
