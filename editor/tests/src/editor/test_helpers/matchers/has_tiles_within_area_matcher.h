#include "../src/engine/graphics/layer/tile_layer.h"
#include "../src/engine/graphics/renderable/bounds_int.h"

#include <catch2/catch_approx.hpp>
#include <catch2/matchers/catch_matchers_templated.hpp>
#include <sstream>

using namespace ::spright::engine;

struct HasTilesWithinAreaMatcher : Catch::Matchers::MatcherGenericBase
{
    inline HasTilesWithinAreaMatcher(const BoundsInt &bounds) : m_Bounds{bounds}
    {
    }

    inline bool match(const TileLayer &layer) const
    {
        bool ret = true;
        for (int i = m_Bounds.minX; i <= m_Bounds.maxX; i++)
        {
            for (int j = m_Bounds.minY; j <= m_Bounds.maxY; j++)
            {
                if (layer.getAtTilePos(i, j) == nullptr)
                {
                    ret = false;
                    nullTiles.push_back(Vec2Int(i, j));
                }
            }
        }

        return ret;
    }

    inline std::string describe() const override
    {
        std::stringstream tiles;

        tiles << "The following tile positions were null: ";
        for (Vec2Int &tilePos : nullTiles)
        {
            tiles << tilePos << " ";
        }

        return tiles.str();
    }

private:
    const BoundsInt &m_Bounds;

    mutable std::vector<Vec2Int> nullTiles;
};

inline auto HasTilesWithinArea(const BoundsInt &bounds) -> HasTilesWithinAreaMatcher
{
    return HasTilesWithinAreaMatcher{bounds};
}
