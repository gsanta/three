#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/eraser_tool/eraser.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/app/tool/brush.h"

using namespace ::spright::editor;

TEST_CASE("Eraser erase", "[eraser]") {
	SECTION("removes the tile at the given position") {

		Container container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(0, 0), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(1, 0), 0xFFFFFFFF);

		Eraser eraser;

		eraser.erase(layer, Vec2Int(0, 0), 1);

		REQUIRE(layer.getAtTilePos(Vec2Int(0, 0)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(1, 0)) != nullptr);
	}

	SECTION("eraser is positioned one tile left and one tile up when eraser size is even") {

		Container container(Dimensions(-5.0f, 5.0f, -5.0f, 5.0f));

		TileLayer layer("layer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(1, 1), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 1), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(1, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(3, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 3), 0xFFFFFFFF);

		Eraser eraser;

		eraser.erase(layer, Vec2Int(2, 2), 2);

		REQUIRE(layer.getAtTilePos(Vec2Int(1, 1)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 1)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(1, 2)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 2)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(3, 2)) != nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 3)) != nullptr);
	}

	SECTION("eraser is positioned at the center when the eraser size is odd") {

		Container container(Dimensions(-5.0f, 5.0f, -5.0f, 5.0f));

		TileLayer layer("layer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(1, 1), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 1), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(3, 1), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(1, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(3, 2), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(1, 3), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(2, 3), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(3, 3), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(4, 3), 0xFFFFFFFF);
		brush.paint(&layer, Vec2Int(3, 4), 0xFFFFFFFF);

		Eraser eraser;

		eraser.erase(layer, Vec2Int(2, 2), 3);

		REQUIRE(layer.getAtTilePos(Vec2Int(1, 1)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 1)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(3, 1)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(1, 2)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 2)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(3, 2)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(1, 3)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(2, 3)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(3, 3)) == nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(4, 3)) != nullptr);
		REQUIRE(layer.getAtTilePos(Vec2Int(3, 4)) != nullptr);
	}
}