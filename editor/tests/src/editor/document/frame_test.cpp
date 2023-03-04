#include <catch2/catch_test_macros.hpp>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/layout/container.h"
#include "../src/app/document/frame.h"


using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("Frame addLayer", "[frame]") {
	SECTION("adds a layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
	
		Frame frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);
		frame.addLayer(layer3);

		REQUIRE(frame.getLayers().size() == 3);
	}
}

TEST_CASE("Frame removeLayer", "[frame]") {
	SECTION("removes a layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		TileLayer temp1("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		temp1 = layer1;
		TileLayer temp2 = layer2;

		Frame frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);
		frame.addLayer(layer3);

		std::vector<TileLayer> l;

		l.push_back(layer1);
		l.erase(l.begin());

		frame.removeLayer(layer2.getId());
		REQUIRE(frame.getLayers().size() == 2);
	}
}

TEST_CASE("Frame setLayerIndex", "[frame]") {
	SECTION("changes the index of a layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		Frame frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);
		frame.addLayer(layer3);

		frame.removeLayer(layer2.getId());
		REQUIRE(frame.getLayers().size() == 2);
	}
}