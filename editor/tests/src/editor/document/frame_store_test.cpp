#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include "../src/app/document/frame_impl.h"
#include "../src/app/document/frame_store.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::editor;

TEST_CASE("FrameStore", "[frame_handler]") {
	SECTION("can return frame by index") {

		FrameImpl frame1(0);
		FrameImpl frame2(0);

		FrameStore frameStore;

		frameStore.addFrame(frame1);
		frameStore.addFrame(frame2);
	
		REQUIRE(frameStore.getFrame(0).getIndex() == 0);
		REQUIRE(frameStore.getFrame(1).getIndex() == 1);
		REQUIRE_THROWS_WITH(frameStore.getFrame(2), "Frame with index 2 not found");
	}

	SECTION("can get/set the active frame") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame1(0);
		frame1.addLayer(layers[0]);
		FrameImpl frame2(1);
		frame2.addLayer(layers[1]);

		FrameStore frameStore;

		frameStore.addFrame(frame1);
		frameStore.addFrame(frame2);


		REQUIRE(frameStore.getActiveFrame().getIndex() == frame1.getIndex());

		frameStore.setActiveFrame(1);

		REQUIRE(frameStore.getActiveFrame().getIndex() == frame2.getIndex());
	}

	SECTION("throws when trying to remove the last frame") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(1);

		FrameImpl frame(0);
		frame.addLayer(layers[0]);

		FrameStore frameStore;
		frameStore.addFrame(frame);

		REQUIRE_THROWS_WITH(frameStore.removeFrame(0), "The last frame can not be removed");
	}

	SECTION("can remove a frame") {
		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

		FrameImpl frame(0);
		frame.addLayer(layers[0]);
		FrameImpl frame2(1);
		frame2.addLayer(layers[1]);
		FrameImpl frame3(1);
		frame3.addLayer(layers[2]);

		FrameStore frameStore;
		frameStore.addFrame(frame);
		frameStore.addFrame(frame2);
		frameStore.addFrame(frame3);

		frameStore.setActiveFrame(1);
		frameStore.removeFrame(1);

		REQUIRE(frameStore.getFrame(1) == frame3);

		// no better way to check that the active frame is frame3
		REQUIRE(frameStore.getActiveFrame().getLayer(0).getName() == frame3.getLayer(0).getName());

		frameStore.removeFrame(1);
		REQUIRE(frameStore.getActiveFrame().getLayer(0).getName() == frame.getLayer(0).getName());
	}
}