#include "../../../../test_helpers/builders/tile_layer_builder.h"
#include "../src/editing/tool/tools/brush_tool/brush.h"
#include "../src/editing/tool/tools/eraser_tool/eraser.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;

TEST_CASE("Eraser erase", "[eraser]")
{
    SECTION("removes the tile at the given position")
    {
        TileLayer layer = TileLayerBuilder().withBounds(Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f)).build();

        Brush brush;
        brush.paint(layer, Vec2Int(0, 0), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(1, 0), 0xFFFFFFFF);

        Eraser eraser;

        eraser.erase(layer, Vec2Int(0, 0), 1);

        REQUIRE(layer.getAtTilePos(0, 0) == nullptr);
        REQUIRE(layer.getAtTilePos(1, 0) != nullptr);
    }

    SECTION("eraser is positioned one tile left and one tile up when eraser size is even")
    {
        TileLayer layer = TileLayerBuilder().withBounds(Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f)).build();

        Brush brush;
        brush.paint(layer, Vec2Int(1, 1), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 1), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(1, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(3, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 3), 0xFFFFFFFF);

        Eraser eraser;

        eraser.erase(layer, Vec2Int(2, 2), 2);

        REQUIRE(layer.getAtTilePos(1, 1) == nullptr);
        REQUIRE(layer.getAtTilePos(2, 1) == nullptr);
        REQUIRE(layer.getAtTilePos(1, 2) == nullptr);
        REQUIRE(layer.getAtTilePos(2, 2) == nullptr);
        REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 3) != nullptr);
    }

    SECTION("eraser is positioned at the center when the eraser size is odd")
    {
        TileLayer layer = TileLayerBuilder().withBounds(Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f)).build();

        Brush brush;
        brush.paint(layer, Vec2Int(1, 1), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 1), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(3, 1), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(1, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(3, 2), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(1, 3), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(2, 3), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(3, 3), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(4, 3), 0xFFFFFFFF);
        brush.paint(layer, Vec2Int(3, 4), 0xFFFFFFFF);

        Eraser eraser;

        eraser.erase(layer, Vec2Int(2, 2), 3);

        REQUIRE(layer.getAtTilePos(1, 1) == nullptr);
        REQUIRE(layer.getAtTilePos(2, 1) == nullptr);
        REQUIRE(layer.getAtTilePos(3, 1) == nullptr);
        REQUIRE(layer.getAtTilePos(1, 2) == nullptr);
        REQUIRE(layer.getAtTilePos(2, 2) == nullptr);
        REQUIRE(layer.getAtTilePos(3, 2) == nullptr);
        REQUIRE(layer.getAtTilePos(1, 3) == nullptr);
        REQUIRE(layer.getAtTilePos(2, 3) == nullptr);
        REQUIRE(layer.getAtTilePos(3, 3) == nullptr);
        REQUIRE(layer.getAtTilePos(4, 3) != nullptr);
        REQUIRE(layer.getAtTilePos(3, 4) != nullptr);
    }
}
