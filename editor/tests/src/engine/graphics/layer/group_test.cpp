#include <catch2/catch_test_macros.hpp>
#include "../src/engine/layout/container.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"

using namespace ::spright::engine;

TEST_CASE("Group", "[group]") {
	SECTION("equals with an other Group with the same data") {
		Rect2D rect1(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
		Rect2D rect2(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		Group<Rect2D> group1(new HeadlessRenderer2D());
		group1.add(rect1);
		group1.add(rect2);

		Group<Rect2D> group2(new HeadlessRenderer2D());
		group2.add(rect1);
		group2.add(rect2);

		REQUIRE(group1 == group2);
	}

	SECTION("does not equal with an other Group with the different data") {
		Rect2D rect1(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
		Rect2D rect2(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		Group<Rect2D> group1(new HeadlessRenderer2D());
		group1.add(rect1);
		group1.add(rect2);

		Group<Rect2D> group2(new HeadlessRenderer2D());
		group2.add(rect2);
		group2.add(rect2);

		REQUIRE(group1 != group2);
	}

	SECTION("add renderable to the layer") {
		Group<Rect2D> group(new HeadlessRenderer2D());

		//group.add()
	}
}