#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/layout/container.h"
#include "../src/app/document/active_frame.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("ActiveFrame", "[active_frame]") {
	SECTION("can get a layer by it's id") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		ActiveFrame frame;

		frame.addBackgroundLayer(layer1);
		frame.addForegroundLayer(layer2);
		frame.addLayer(layer3);

		REQUIRE(frame.getLayer("id1").getId() == "id1");
		REQUIRE(frame.getLayer("id2").getId() == "id2");
		REQUIRE(frame.getLayer("id3").getId() == "id3");
	}

	SECTION("throws if layer with id is not found") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		ActiveFrame frame;

		frame.addBackgroundLayer(layer1);

		REQUIRE_THROWS_WITH(frame.getLayer("id2"), "Layer with id id2 not found");
	}
}