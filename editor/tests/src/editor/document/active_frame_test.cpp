#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include "../src/app/document/active_frame.h"
#include "../src/app/document/frame_impl.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("ActiveFrame", "[active_frame]") {
	SECTION("can get a layer by it's index") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		std::vector<FrameImpl> frames{ FrameImpl() };
		frames[0].addLayer(layers[0]);
		frames[0].addLayer(layers[1]);
		frames[0].addLayer(layers[2]);

		ActiveFrame activeFrame(frames, 0);

		REQUIRE(activeFrame.getLayer(0).getName() == "layer_0");
		REQUIRE(activeFrame.getLayer(1).getName() == "layer_1");
		REQUIRE(activeFrame.getLayer(2).getName() == "layer_2");
	}

	SECTION("throws if layer with id is not found") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		std::vector<FrameImpl> frames{ FrameImpl() };

		frames[0].addLayer(layers[1]);
		ActiveFrame activeFrame(frames, 0);

		activeFrame.addBackgroundLayer(layers[0]);

		REQUIRE_THROWS_WITH(activeFrame.getLayer(2), "No layer at index 2");
	}

	SECTION("can set the active layer") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		std::vector<FrameImpl> frames{ FrameImpl() };

		frames[0].addLayer(layers[0]);
		frames[0].addLayer(layers[1]);
		frames[0].addLayer(layers[2]);

		ActiveFrame activeFrame(frames, 0);

		activeFrame.setActiveLayer(1);

		REQUIRE(activeFrame.getActiveLayer().getName() == layers[1].getName());
	}
}