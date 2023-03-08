#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include "../src/app/document/frame_impl.h"
#include "../src/app/document/frame_handler.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"


using namespace ::spright::editor;

TEST_CASE("FrameHandler", "[frame_handler]") {
	SECTION("can return Frame by index") {

		FrameImpl frame1(0);
		FrameImpl frame2(0);

		FrameHandler frameHandler;

		frameHandler.addFrame(frame1);
		frameHandler.addFrame(frame2);
	
		REQUIRE(frameHandler.getFrame(0).getIndex() == 0);
		REQUIRE(frameHandler.getFrame(1).getIndex() == 1);
		REQUIRE_THROWS_WITH(frameHandler.getFrame(2), "Frame with index 2 not found");
	}

	SECTION("can set the active index") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer layer1("layer1", "id1", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer layer2("layer2", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		FrameImpl frame1(1);
		frame1.addLayer(layer1);
		FrameImpl frame2(1);
		frame2.addLayer(layer2);

		FrameHandler frameHandler;

		frameHandler.addFrame(frame1);
		frameHandler.addFrame(frame2);

		REQUIRE(frameHandler.getActiveFrame() == nullptr);

		frameHandler.setActiveFrame(1);

		REQUIRE(frameHandler.getActiveFrame().get()->getIndex() == frame2.getIndex());
	}
}