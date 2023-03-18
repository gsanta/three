#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../src/engine/graphics/camera/camera.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/layout/container.h"
#include "../src/engine/graphics/renderable/rect2d.h"

using namespace ::spright::engine;

TEST_CASE("Layer", "[tile_layer]") {
	SECTION("equals with an other TileLayer with the same data") {
		TileLayer layer1("layer", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));
		TileLayer layer2("layer", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));

		Rect2D rect1(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
		Rect2D rect2(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		layer1.add(rect1);
		layer1.add(rect2);
		layer2.add(rect1);
		layer2.add(rect2);

		REQUIRE(layer1 == layer2);
	}

	SECTION("does not equal with an other TileLayer with the different data") {
		TileLayer layer1("layer", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));
		TileLayer layer2("layer_2", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));
		TileLayer layer3("layer_3", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));
		TileLayer layer4("layer_4", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-5.0f, 5.0f, -5.0f, 5.0f));
		TileLayer layer5("layer_5", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));
		layer5.add(Rect2D(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF));

		REQUIRE(layer1 != layer2);
		REQUIRE(layer1 != layer3);
		REQUIRE(layer1 != layer4);
		REQUIRE(layer1 != layer5);
	}	

	SECTION("can add a renderable to the layer") {
		TileLayer layer("layer", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));

		REQUIRE(layer.getRenderables().size() == 0);

		layer.add(Rect2D(0, 0, 1, 1, 0x00000000));

		REQUIRE(layer.getRenderables().size() == 1);
		
		layer.add(Rect2D(2, 2, 1, 1, 0x00000000));

		REQUIRE(layer.getRenderables().size() == 2);

		Vec2Int pos = layer.getTilePos(Vec2(0.5f, 0.5f));
	}

	SECTION("can convert world coordinates to tile coordinates starting at the document bottom left position") {
		TileLayer layer("layer", Group<Rect2D>(new HeadlessRenderer2D()), Bounds::createWithPositions(-16.0f, 16.0f, -16.0f, 16.0f));

		float tileSize = layer.getTileSize();

		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).x == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).y == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).x == 1);
		REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).y == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).x == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).y == 1);
	}
}
