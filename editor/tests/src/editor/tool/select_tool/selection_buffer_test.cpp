#include "../../test_helpers/matchers/equals_tile_bounds_matcher.h"
#include "../../test_helpers/tile_layer_builder.h"
#include "../src/app/tool/tools/select_tool/selection_buffer.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

SCENARIO("Select buffer")
{
    TileLayer layer = TileLayerBuilder().withBounds(BoundsInt(0, 0, 5, 5)).build();
    SelectionBuffer buffer;

    GIVEN("An empty buffer")
    {
        THEN("it returns the default bounds")
        {
            REQUIRE_THAT(buffer.getTileBounds(), EqualsTileBounds(BoundsInt()));
        }

        WHEN("adding tile a to the selection")
        {
            buffer.add(layer.getTileIndex(3, 0), layer);

            THEN("it updates the tile bounds")
            {
                REQUIRE_THAT(buffer.getTileBounds(), EqualsTileBounds(BoundsInt(Vec2Int(3, 0), Vec2Int(4, 1))));
            }

            WHEN("adding multiple tiles a to the selection")
            {
                buffer.add(0, layer);
                buffer.add(layer.getTileIndex(0, 2), layer);

                REQUIRE_THAT(buffer.getTileBounds(), EqualsTileBounds(BoundsInt(0, 0, 4, 3)));
            }
        }
    }

    GIVEN("a not empty buffer")
    {
        buffer.add(layer.getTileIndex(3, 0), layer);

        WHEN("setting tile indexes")
        {
            THEN("it clears the previous bounds and indexes")
            {
                buffer.setTileIndexes(std::vector<int>{}, layer);
                REQUIRE_THAT(buffer.getTileBounds(), EqualsTileBounds(BoundsInt()));
                REQUIRE(buffer.getTileIndexes().size() == 0);
            }

            THEN("sets the new indexes and recalculates the bounds")
            {
                buffer.setTileIndexes(std::vector<int>{layer.getTileIndex(1, 2), layer.getTileIndex(3, 3)}, layer);

                REQUIRE_THAT(buffer.getTileBounds(), EqualsTileBounds(BoundsInt(Vec2Int(1, 2), Vec2Int(4, 4))));
                REQUIRE(buffer.getTileIndexes().size() == 2);
                REQUIRE(buffer.getTileIndexes()[0] == layer.getTileIndex(1, 2));
                REQUIRE(buffer.getTileIndexes()[1] == layer.getTileIndex(3, 3));
            }
        }
    }
}
