#include "./shear_horizontal.h"

namespace spright
{
namespace editor
{
    std::vector<int> shear_horizontal(TileLayer &source, const BoundsInt &bounds, float angle)
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
        int inityincr = (int)(invangle / 2.0f);
        int yincr = (int)invangle;

        Vec2Int center = bounds.getCenter();

        tile_operation_copy_area(source,
                                 dest,
                                 BoundsInt(bounds.minX, center.y - inityincr, bounds.maxX, center.y + inityincr),
                                 Vec2Int(bounds.minX, center.y - inityincr));


        for (int hShift = 1, y = center.y + inityincr; y < bounds.maxY; hShift++)
        {
            yincr = (int)(invangle * (hShift + 0.5) + 0.5) - (y - center.y);
            if (bounds.maxY - y < yincr) /* reduce for last one if req'd */
                yincr = bounds.maxY - y;

            tile_operation_copy_area(source,
                                     dest,
                                     BoundsInt(bounds.minX, y, bounds.maxX, y + yincr),
                                     Vec2Int(bounds.minX + -sign * hShift, y));
            y += yincr;
        }

        for (int hShift = -1, y = center.y - inityincr; y > bounds.minY; hShift--)
        {
            yincr = (y - center.y) - (int)(invangle * (hShift - 0.5) + 0.5);
            if ((y - bounds.minY) < yincr) /* reduce for last one if req'd */
                yincr = (y - bounds.minY);

            tile_operation_copy_area(source,
                                     dest,
                                     BoundsInt(bounds.minX, y - yincr, bounds.maxX, y),
                                     Vec2Int(bounds.minX + -sign * hShift, y - yincr));
            y -= yincr;
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
