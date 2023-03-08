#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include <vector>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/layout/container.h"
#include "../src/app/document/frame_impl.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("Frame", "[frame]") {
	SECTION("can add a layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		std::vector<TileLayer> layers = TestDocumentFactory::createLayers(3);
	
		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.addLayer(layers[2]);

		REQUIRE(frame.getLayers().size() == 3);
	}

	SECTION("can remove a layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		TileLayer temp1("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		temp1 = layer1;
		TileLayer temp2 = layer2;

		FrameImpl frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);
		frame.addLayer(layer3);

		std::vector<TileLayer> l;

		l.push_back(layer1);
		l.erase(l.begin());

		frame.removeLayer(layer2.getId());
		REQUIRE(frame.getLayers().size() == 2);
	}

	SECTION("can insert layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		FrameImpl frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);
		frame.insertLayer(layer3, 0);

		REQUIRE(frame.getLayerIndex(layer3) == 0);
		REQUIRE(frame.getLayerIndex(layer1) == 1);
		REQUIRE(frame.getLayerIndex(layer2) == 2);
	}

	SECTION("can get a layer's index") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer3("layer3", "id3", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		FrameImpl frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);

		REQUIRE(frame.getLayerIndex(layer1) == 0);
		REQUIRE(frame.getLayerIndex(layer2) == 1);
	}

	SECTION("can get a layer by it's id") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		FrameImpl frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);

		REQUIRE(frame.getLayer("id2").getId() == "id2");
	}


	SECTION("throws if layer with id is not found") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		FrameImpl frame;

		frame.addLayer(layer1);
		frame.addLayer(layer2);

		REQUIRE_THROWS_WITH(frame.getLayer("id3"), "Layer with id id3 not found");
	}
}