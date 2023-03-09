#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include <vector>
#include "../src/app/document/frame_impl.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("Frame", "[frame]") {
	SECTION("can add a layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);
	
		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.addLayer(layers[2]);

		REQUIRE(frame.getLayers().size() == 3);
	}

	SECTION("can remove a layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.addLayer(layers[2]);

		std::vector<TileLayer> l;

		l.push_back(layers[0]);
		l.erase(l.begin());

		frame.removeLayer(layers[1].getId());
		REQUIRE(frame.getLayers().size() == 2);
	}

	SECTION("can insert layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.insertLayer(layers[2], 0);

		REQUIRE(frame.getLayerIndex(layers[2]) == 0);
		REQUIRE(frame.getLayerIndex(layers[0]) == 1);
		REQUIRE(frame.getLayerIndex(layers[1]) == 2);
	}

	SECTION("can get a layer's index") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE(frame.getLayerIndex(layers[0]) == 0);
		REQUIRE(frame.getLayerIndex(layers[1]) == 1);
	}

	SECTION("can get a layer by it's id") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE(frame.getLayer("id1").getId() == "id1");
	}


	SECTION("throws if layer with id is not found") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE_THROWS_WITH(frame.getLayer("id3"), "Layer with id id3 not found");
	}
}