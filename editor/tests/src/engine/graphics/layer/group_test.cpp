#include <catch2/catch_test_macros.hpp>
#include "../src/engine/layout/container.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"

using namespace ::spright::engine;

TEST_CASE("Group", "[group]") {
	SECTION("add renderable to the layer") {
		Container* container = new Container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		Group<Rect2D> group(new HeadlessRenderer2D());

		//group.add()
	}
}