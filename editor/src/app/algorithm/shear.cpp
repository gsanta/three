#include "./shear.h"

namespace spright
{
namespace editor
{
    static const float MinDiffFromHalfPi = 0.04f;

    float get_sign(float number)
    {
        return number < 0 ? -1 : 1;
    }

    float get_abs(float number)
    {
        return number < 0 ? -1 * number : number;
    }

    float normalize_angle_for_shear(float radang, float mindif)
    {
        float pi2;

        /* Bring angle into range [-pi/2, pi/2] */
        pi2 = 3.14159265 / 2.0;
        if (radang < -pi2 || radang > pi2)
            radang = radang - (float)(radang / pi2) * pi2;

        /* If angle is too close to pi/2 or -pi/2, move it */
        if (radang > pi2 - mindif)
        {
            radang = pi2 - mindif;
        }
        else if (radang < -pi2 + mindif)
        {
            radang = -pi2 + mindif;
        }

        return radang;
    }

    void shear_vertical(TileView &source, const BoundsInt &bounds, float angle)
    {
        TileView dest(source.getBounds(), source.getTileSize());

        angle = normalize_angle_for_shear(angle, MinDiffFromHalfPi);

        if (angle == 0.0 || tan(angle) == 0.0)
        {
            return;
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
    }

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


        for (int hShift = 1, y = center.y + inityincr; y < bounds.minY + bounds.getHeight(); hShift++)
        {
            yincr = (int)(invangle * (hShift + 0.5) + 0.5) - (y - center.y);
            if (bounds.minY + bounds.getHeight() - y < yincr) /* reduce for last one if req'd */
                yincr = bounds.minY + bounds.getHeight() - y;

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
