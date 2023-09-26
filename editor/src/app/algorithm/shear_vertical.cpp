#include "shear_vertical.h"

namespace spright
{
namespace editor
{
    std::vector<int> shear_vertical(TileLayer &source, const BoundsInt &bounds, float angle)
    {
        TileView dest(source.getBounds(), source.getTileSize());

        angle = normalize_angle_for_shear(angle, MinDiffFromHalfPi);

        if (angle == 0.0 || tan(angle) == 0.0)
        {
            return std::vector<int>();
        }

        int sign = get_sign(angle);
        float tanangle = tan(angle);
        float invangle = get_abs(1.0f / tanangle);
        int initxincr = (int)invangle / 2.0f;
        int xincr = (int)invangle;

        Vec2Int center = bounds.getCenter();

        tile_operation_copy_area(source,
                                 dest,
                                 BoundsInt(center.x - initxincr, bounds.minY, center.x + initxincr, bounds.maxY),
                                 Vec2Int(center.x - initxincr, bounds.minY));

        for (int vShift = 1, x = center.x + initxincr; x < bounds.minX + bounds.getWidth(); vShift++)
        {
            xincr = (int)(invangle * (vShift + 0.5) + 0.5) - (x - center.x);
            if (bounds.minX + bounds.getWidth() - x < xincr) /* reduce for last one if req'd */
                xincr = bounds.minX + bounds.getWidth() - x;

            tile_operation_copy_area(source,
                                     dest,
                                     BoundsInt(x, bounds.minY, x + xincr, bounds.maxY),
                                     Vec2Int(x, bounds.minY + sign * vShift));

            x += xincr;
        }

        for (int vShift = -1, x = center.x - initxincr; x > bounds.minX; vShift--)
        {
            xincr = (x - center.x) - (int)(invangle * (vShift - 0.5) + 0.5);
            if ((x - bounds.minX) < xincr) /* reduce for last one if req'd */
                xincr = (x - bounds.minX);


            tile_operation_copy_area(source,
                                     dest,
                                     BoundsInt(x - xincr, bounds.minY, x, bounds.maxY),
                                     Vec2Int(x - xincr, bounds.minY + sign * vShift));

            x -= xincr;
        }

        tile_operation_remove_area(source, bounds);
        tile_operation_copy_all(dest, source);

        std::vector<int> newIndexes;

        for (const Rect2D *tile : dest.getTiles())
        {
            newIndexes.push_back(dest.getTileIndex(tile->getCenterPosition2d()));
        }

        return newIndexes;
    }
} // namespace editor
} // namespace spright
