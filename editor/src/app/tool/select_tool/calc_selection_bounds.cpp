#include "./calc_selection_bounds.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    BoundsInt calc_selection_bounds(const TileLayer &layer, const Vec2 &vec1, const Vec2 &vec2)
    {
        Bounds bounds(vec1, vec2);

        Vec2 bottomLeft = bounds.getBottomLeft();
        Vec2 topRight = bounds.getTopRight();

        float tileSize = layer.getTileSize();

        return BoundsInt(layer.getTilePos(vec1), layer.getTilePos(vec2));
    }
} // namespace editor
} // namespace spright
