#include "../../test_helpers/builders/tile_layer_builder.h"
#include "../src/editing/algorithms/tile_operations.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

using namespace spright::editing;
using namespace spright::engine;

SCENARIO("Tile operations")
{
    GIVEN("a tile layer")
    {
        TileLayer sourceTileLayer = TileLayerBuilder().withBounds(BoundsInt(1, 1, 5, 5)).withTileFill().build();
        TileLayer destTileLayer = TileLayerBuilder().withBounds(BoundsInt(1, 1, 5, 5)).build();

        WHEN("copying an area")
        {
            tile_operation_copy_area(sourceTileLayer, destTileLayer, BoundsInt(1, 1, 3, 3), Vec2Int(1, 1));

            THEN("the destination view contains the copied area")
            {
                REQUIRE(destTileLayer.getTiles().size() == 4);
                REQUIRE(destTileLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 2) != nullptr);
            }
        }

        WHEN("copying an area with a shift")
        {
            tile_operation_copy_area(sourceTileLayer, destTileLayer, BoundsInt(0, 0, 2, 2), Vec2Int(1, 0));

            THEN("the destination view contains the copied area")
            {
                REQUIRE(destTileLayer.getTiles().size() == 4);
                REQUIRE(destTileLayer.getAtTilePos(1, 0) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 0) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 1) != nullptr);
            }
        }

        WHEN("copying all")
        {
            tile_operation_copy_all(sourceTileLayer, destTileLayer);

            THEN("the destination view contains all tiles from the source view")
            {
                REQUIRE(sourceTileLayer.getTiles().size() == 16);
            }

            WHEN("the bounds of the two views are different")
            {
                TileLayer destWithDifferentBounds = TileLayerBuilder().withBounds(BoundsInt(2, 2, 5, 5)).build();

                THEN("it throws")
                {
                    REQUIRE_THROWS_WITH(tile_operation_copy_all(sourceTileLayer, destWithDifferentBounds),
                                        "Can not copy to a tile view with different size");
                }
            }
        }

        WHEN("removing an area")
        {
            tile_operation_remove_area(sourceTileLayer, BoundsInt(1, 1, 3, 3));

            THEN("the tiles within that area are removed")
            {
                REQUIRE(sourceTileLayer.getTiles().size() == 12);

                REQUIRE(destTileLayer.getAtTilePos(1, 1) == nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 1) == nullptr);
                REQUIRE(destTileLayer.getAtTilePos(1, 2) == nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 2) == nullptr);
            }
        }
    }
}
