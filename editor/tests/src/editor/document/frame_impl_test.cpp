#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include <vector>
#include "../src/app/document/frame_impl.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("FrameImpl", "[frame_impl]") {
	SECTION("equals with an other Frame with the same data") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
		Rect2D rect2(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);

		layers[0].add(rect1);
		layers[1].add(rect2);

		FrameImpl frame1;
		FrameImpl frame2;

		frame1.addLayer(layers[0]);
		frame1.addLayer(layers[1]);
		frame2.addLayer(layers[0]);
		frame2.addLayer(layers[1]);

		REQUIRE(frame1 == frame2);
	}

	SECTION("does not equal with another Frame with the different data") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame1;
		FrameImpl frame2;

		frame1.addLayer(layers[0]);
		frame2.addLayer(layers[1]);

		REQUIRE(frame1 != frame2);
	}

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

		frame.removeLayer(1);
		REQUIRE(frame.getLayers().size() == 2);
	}

	SECTION("can insert layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.insertLayer(layers[2], 0);

		REQUIRE(frame.getLayer(0).getName() == "layer_2");
		REQUIRE(frame.getLayer(1).getName() == "layer_0");
		REQUIRE(frame.getLayer(2).getName() == "layer_1");
	}

	SECTION("sets the layer index when adding a layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE(frame.getLayer(0).getIndex() == 0);
		REQUIRE(frame.getLayer(1).getIndex() == 1);
	}

	SECTION("can get a layer by it's index") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE(frame.getLayer(1).getName() == "layer_1");
	}


	SECTION("throws if layer with id is not found") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);

		REQUIRE_THROWS_WITH(frame.getLayer(2), "No layer at index 2");
	}
}