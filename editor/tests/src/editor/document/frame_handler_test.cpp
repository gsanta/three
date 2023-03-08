#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include "../src/app/document/frame_impl.h"
#include "../src/app/document/frame_handler.h"

using namespace ::spright::editor;

TEST_CASE("FrameHandler", "[frame_handler]") {
	SECTION("can return Frame by index") {

		FrameImpl frame1(1);
		FrameImpl frame2(2);

		FrameHandler frameHandler;

		frameHandler.addFrame(frame1);
		frameHandler.addFrame(frame2);
	
		REQUIRE(frameHandler.getFrame(1).getIndex() == 1);
		REQUIRE(frameHandler.getFrame(2).getIndex() == 2);
		REQUIRE_THROWS_WITH(frameHandler.getFrame(3), "Frame with index 3 not found");
	}
}