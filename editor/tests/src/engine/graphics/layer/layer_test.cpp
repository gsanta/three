#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/layer/dimensions.h"
#include "../src/engine/graphics/camera/camera.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/layout/container.h"

using namespace ::spright::engine;

TEST_CASE("Layer add", "[layer]") {
	SECTION("can add a renderable to the layer") {
		
		Container* container = new Container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), container);

		REQUIRE(layer.getRenderables().size() == 0);

		layer.add(new Rect2D(0, 0, 1, 1, 0x00000000));

		REQUIRE(layer.getRenderables().size() == 1);
		
		layer.add(new Rect2D(2, 2, 1, 1, 0x00000000));

		REQUIRE(layer.getRenderables().size() == 2);

		Vec2Int pos = layer.getTilePos(Vec2(0.5f, 0.5f));
	}
}

TEST_CASE("Layer getTilePos", "[layer]") {
	SECTION("converts world coordinates to tile coordinates starting at the document bottom left position") {
		Container* container = new Container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), container);

		float tileSize = layer.getTileSize();

		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).x == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).y == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).x == 1);
		REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).y == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).x == 0);
		REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).y == 1);
	}
}
