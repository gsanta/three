#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include "../src/app/document/frame_impl.h"
#include "../src/app/document/frame_handler.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::editor;

TEST_CASE("FrameHandler", "[frame_handler]") {
	SECTION("can return frame by index") {

		FrameImpl frame1(0);
		FrameImpl frame2(0);

		FrameHandler frameHandler;

		frameHandler.addFrame(frame1);
		frameHandler.addFrame(frame2);
	
		REQUIRE(frameHandler.getFrame(0).getIndex() == 0);
		REQUIRE(frameHandler.getFrame(1).getIndex() == 1);
		REQUIRE_THROWS_WITH(frameHandler.getFrame(2), "Frame with index 2 not found");
	}

	SECTION("can get/set the active frame") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

		FrameImpl frame1(1);
		frame1.addLayer(layers[0]);
		FrameImpl frame2(1);
		frame2.addLayer(layers[1]);

		FrameHandler frameHandler;

		frameHandler.addFrame(frame1);
		frameHandler.addFrame(frame2);

		REQUIRE(frameHandler.hasActiveFrame() == false);
		REQUIRE_THROWS_WITH(frameHandler.getActiveFrame(), "No active frame set.");

		frameHandler.setActiveFrame(1);

		REQUIRE(frameHandler.getActiveFrame().getIndex() == frame2.getIndex());
	}
}