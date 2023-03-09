#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include "../src/app/document/active_frame.h"
#include "../src/app/document/frame_impl.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("ActiveFrame", "[active_frame]") {
	SECTION("can get a layer by it's id") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame;
		frame.addLayer(layers[2]);
		ActiveFrame activeFrame(frame);

		activeFrame.addBackgroundLayer(layers[0]);
		activeFrame.addForegroundLayer(layers[1]);

		REQUIRE(activeFrame.getLayer("id0").getId() == "id0");
		REQUIRE(activeFrame.getLayer("id1").getId() == "id1");
		REQUIRE(activeFrame.getLayer("id2").getId() == "id2");
	}

	SECTION("throws if layer with id is not found") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame;
		frame.addLayer(layers[1]);
		ActiveFrame activeFrame(frame);

		activeFrame.addBackgroundLayer(layers[0]);

		REQUIRE_THROWS_WITH(frame.getLayer("id2"), "Layer with id id2 not found");
	}

	SECTION("can set the active layer") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame;

		frame.addLayer(layers[0]);
		frame.addLayer(layers[1]);
		frame.addLayer(layers[2]);

		ActiveFrame activeFrame(frame);

		REQUIRE(activeFrame.getActiveLayer().getId() == layers[0].getId());

		activeFrame.setActiveLayer(layers[1]);

		REQUIRE(activeFrame.getActiveLayer().getId() == layers[1].getId());
	}
}