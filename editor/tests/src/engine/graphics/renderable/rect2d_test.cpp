#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

TEST_CASE("Rect2D", "[rect2d]")
{
    SECTION("equals with an other Rect2D with the same data")
    {
        Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect2(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

        REQUIRE(rect1 == rect2);
    }

    SECTION("does not equals with an other Rect2D with different data")
    {
        Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect2(2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect3(-2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect4(-2.0f, -3.0f, -3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect5(-2.0f, -3.0f, 3.0f, -5.0f, 0xFF0000FF);
        Rect2D rect6(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF00FF00);

        REQUIRE(rect1 != rect2);
        REQUIRE(rect1 != rect3);
        REQUIRE(rect1 != rect4);
        REQUIRE(rect1 != rect5);
        REQUIRE(rect1 != rect6);
    }
}

TEST_CASE("Rect2D contains", "[rect2d]")
{
    SECTION("check a point with positive coordinates inside of the rect")
    {
        Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

        REQUIRE(rect.contains(Vec2(0.7f, 1.0f)) == true);
    }

    SECTION("check a point with negative coordinates inside of the rect")
    {
        Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

        REQUIRE(rect.contains(Vec2(-1.0f, -2.0f)) == true);
    }

    SECTION("check a point outside of the rect")
    {
        Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

        REQUIRE(rect.contains(Vec2(3.0f, -2.0f)) == false);
    }
}

TEST_CASE("Rect2D translate", "[rect2d]")
{
    SECTION("move rect with a positive vector")
    {
        Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        rect.translate(Vec2(2.0f, 1.5f));

        REQUIRE(rect.getPosition().x == Catch::Approx(0));
        REQUIRE(rect.getPosition().y == Catch::Approx(-1.5f));
    }

    SECTION("move rect with a negative vector")
    {
        Rect2D rect(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        rect.translate(Vec2(-2.5f, -3.0f));

        REQUIRE(rect.getPosition().x == Catch::Approx(-4.5f));
        REQUIRE(rect.getPosition().y == Catch::Approx(-6.0f));
    }
}
