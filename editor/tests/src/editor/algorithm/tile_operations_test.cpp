#include "../src/app/algorithm/tile_operations.h"
#include "../test_helpers/tile_layer_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editor;
using namespace spright::engine;

SCENARIO("Tile operations")
{
    GIVEN("a tile layer")
    {
        TileLayer sourceTileLayer = TileLayerBuilder().withBounds(BoundsInt(2, 2, 5, 5)).withTileFill().build();
        TileLayer destTileLayer = TileLayerBuilder().withBounds(BoundsInt(2, 2, 5, 5)).build();

        WHEN("copying an area of tiles")
        {
            tile_operation_copy_area(sourceTileLayer, destTileLayer, BoundsInt(1, 1, 3, 3), Vec2Int(1, 1));

            THEN("the destination layer contains the copied area")
            {
                REQUIRE(destTileLayer.getTiles().size() == 4);
                REQUIRE(destTileLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 2) != nullptr);
            }
        }

        WHEN("copying an area of tiles with a shift")
        {
            tile_operation_copy_area(sourceTileLayer, destTileLayer, BoundsInt(0, 0, 2, 2), Vec2Int(1, 0));

            THEN("the destination layer contains the copied area")
            {
                REQUIRE(destTileLayer.getTiles().size() == 4);
                REQUIRE(destTileLayer.getAtTilePos(1, 0) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 0) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(destTileLayer.getAtTilePos(2, 1) != nullptr);
            }
        }
    }
}
