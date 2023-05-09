
#include "../src/engine/graphics/camera/camera.cpp"

#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

TEST_CASE("Camera", "[camera]")
{
    SECTION("can convert from screen to world pos")
    {
        Camera camera(500.0f, 500.0f, Bounds(-10.0f, -10.0f, 20.0f, 20.0f), -1.0f, 1.0f);

        REQUIRE(camera.screenToWorldPos(500.0f, 500.0f) == Vec2(10.0f, -10.0f));
        REQUIRE(camera.screenToWorldPos(0.0f, 0.0f) == Vec2(-10.0f, 10.0f));
        REQUIRE(camera.screenToWorldPos(50.0f, 50.0f) == Vec2(-8.0f, 8.0f));
    }

    SECTION("can convert from screen to world pos with camera translate")
    {
        Camera camera(500.0f, 500.0f, Bounds(-10.0f, -10.0f, 20.0f, 20.0f), -1.0f, 1.0f);

        camera.translate2D(Vec2(5.0f, 0.0f));

        REQUIRE(camera.screenToWorldPos(500.0f, 500.0f) == Vec2(15.0f, -10.0f));
        REQUIRE(camera.screenToWorldPos(0.0f, 0.0f) == Vec2(-5.0f, 10.0f));
        REQUIRE(camera.screenToWorldPos(50.0f, 50.0f) == Vec2(-3.0f, 8.0f));
    }

    SECTION("can convert from world to screen pos")
    {
        Camera camera(500.0f, 500.0f, Bounds(-10.0f, -10.0f, 20.0f, 20.0f), -1.0f, 1.0f);

        REQUIRE(camera.worldToScreenPos(10.0f, -10.0f) == Vec2Int(500, 0));
        REQUIRE(camera.worldToScreenPos(-10.0f, -10.0f) == Vec2Int(0, 0));
        REQUIRE(camera.worldToScreenPos(-8.0f, 8.0f) == Vec2Int(50, 450));
    }

    SECTION("can convert from world to screen pos with camera translate")
    {
        Camera camera(500.0f, 500.0f, Bounds(-10.0f, -10.0f, 20.0f, 20.0f), -1.0f, 1.0f);

        camera.translate2D(Vec2(5.0f, 0.0f));

        REQUIRE(camera.worldToScreenPos(15.0f, -10.0f) == Vec2Int(500, 0));
        REQUIRE(camera.worldToScreenPos(-5.0f, -10.0f) == Vec2Int(0, 0));
        REQUIRE(camera.worldToScreenPos(-3.0f, 8.0f) == Vec2Int(50, 450));
    }
}