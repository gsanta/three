
#include "checkerboard.h"

namespace spright
{
namespace editing
{
    void Checkerboard::create(TileLayer &layer) const
    {
        float left = layer.getBounds().minX;
        float right = layer.getBounds().maxX;
        float bottom = layer.getBounds().minY;
        float top = layer.getBounds().maxY;

        float tileSize = layer.getTileSize();

        int counter = 1;
        bool even = false;

        for (float i = left; i < right; i += tileSize)
        {
            for (float j = bottom; j < top; j += tileSize)
            {
                counter++;
                int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;

                float width = i + tileSize > right ? right - i : tileSize;
                float height = j + tileSize > top ? top - j : tileSize;

                layer.add(Rect2D(i, j, width, height, color));
            }

            counter = 1;
            even = !even;
            counter = even ? 0 : 1;
        }
    }
} // namespace editing
} // namespace spright
