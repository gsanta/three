#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/maths/vec2.h"

using namespace engine::graphics;

TEST_CASE("Rect2D contains", "[rect2d]")
{
	SECTION("check a point with positive coordinates inside of the rect") {
		Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		REQUIRE(rect.contains(Vec2(0.7f, 1.0f)) == true);
	}

	SECTION("check a point with negative coordinates inside of the rect") {
		Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		REQUIRE(rect.contains(Vec2(-1.0f, -2.0f)) == true);
	}

	SECTION("check a point outside of the rect") {
		Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

		REQUIRE(rect.contains(Vec2(3.0f, -2.0f)) == false);
	}
}

TEST_CASE("Rect2D translate", "[rect2d]")
{
	SECTION("move rect with a positive vector") {
		Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
		rect.translate(Vec2(2.0f, 1.5f));

		REQUIRE(rect.getPosition().x == Catch::Approx(0));
		REQUIRE(rect.getPosition().y == Catch::Approx(-1.5f));
	}

	SECTION("move rect with a negative vector") {
		Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
		rect.translate(Vec2(-2.5f, -3.0f));

		REQUIRE(rect.getPosition().x == Catch::Approx(-4.5f));
		REQUIRE(rect.getPosition().y == Catch::Approx(-6.0f));
	}
}