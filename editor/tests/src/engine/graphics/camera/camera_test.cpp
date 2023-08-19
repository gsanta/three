
#include "../src/engine/graphics/camera/camera.cpp"
#include "../src/engine/system/window/impl/headless/headless_window.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

SCENARIO("Camera")
{
    GIVEN("a window")
    {
        int windowWidth = 10;
        int windowHeight = 8;
        HeadlessWindow window(10, 8);

        Camera camera(&window, -1.0f, 1.0f, 1);

        THEN("it can convert from screen to world pos")
        {
            REQUIRE(camera.screenToWorldPos(0, 0) == Vec2(-5.0f, 4.0f));
            REQUIRE(camera.screenToWorldPos(10, 8) == Vec2(5.0f, -4.0f));
            REQUIRE(camera.screenToWorldPos(5, 4) == Vec2(0, 0));
        }

        THEN("it can convert from world to screen pos")
        {
            REQUIRE(camera.worldToScreenPos(0, 0) == Vec2Int(5, 4));
            REQUIRE(camera.worldToScreenPos(5.0f, -4.0f) == Vec2Int(10, 8));
            REQUIRE(camera.worldToScreenPos(-5.0f, 4.0f) == Vec2Int(0, 0));
        }

        WHEN("the camera has a zoom factor of 2")
        {
            int zoomFactor = 2;
            Camera cameraWithZoomFactor(&window, -1.0f, 1.0f, zoomFactor);

            THEN("world pos is half of the screen pos")
            {
                REQUIRE(cameraWithZoomFactor.screenToWorldPos(0, 0) == Vec2(-2.5f, 2.0f));
                REQUIRE(cameraWithZoomFactor.screenToWorldPos(10, 8) == Vec2(2.5f, -2.0f));
                REQUIRE(cameraWithZoomFactor.screenToWorldPos(5, 4) == Vec2(0, 0));
            }

            THEN("screen pos is twice of the world pos")
            {
                REQUIRE(cameraWithZoomFactor.worldToScreenPos(0, 0) == Vec2Int(5, 4));
                REQUIRE(cameraWithZoomFactor.worldToScreenPos(2.5f, -2.0f) == Vec2Int(10, 8));
                REQUIRE(cameraWithZoomFactor.worldToScreenPos(-2.5f, 2.0f) == Vec2Int(0, 0));
            }
        }

        WHEN("the camera has a 2 times zoom")
        {
            camera.setZoom(2);

            THEN("world pos is half of the screen pos")
            {
                REQUIRE(camera.screenToWorldPos(0, 0) == Vec2(-2.5f, 2.0f));
                REQUIRE(camera.screenToWorldPos(10, 8) == Vec2(2.5f, -2.0f));
                REQUIRE(camera.screenToWorldPos(5, 4) == Vec2(0, 0));
            }

            THEN("screen pos is twice of the world pos")
            {
                REQUIRE(camera.worldToScreenPos(0, 0) == Vec2Int(5, 4));
                REQUIRE(camera.worldToScreenPos(2.5f, -2.0f) == Vec2Int(10, 8));
                REQUIRE(camera.worldToScreenPos(-2.5f, 2.0f) == Vec2Int(0, 0));
            }

            WHEN("the camera is translated")
            {
                camera.translate2D(Vec2(1.0f, 2.0f));

                THEN("world pos is translated from screen pos to right/up direction")
                {
                    REQUIRE(camera.screenToWorldPos(0, 0) == Vec2(-1.5f, 4.0f));
                    REQUIRE(camera.screenToWorldPos(10, 8) == Vec2(3.5f, 0));
                    REQUIRE(camera.screenToWorldPos(5, 4) == Vec2(1, 2));
                }

                THEN("screen pos is translated from world pos to left/down direction")
                {
                    REQUIRE(camera.worldToScreenPos(1.0f, 2.0f) == Vec2Int(5, 4));
                    REQUIRE(camera.worldToScreenPos(3.5f, 0) == Vec2Int(10, 8));
                    REQUIRE(camera.worldToScreenPos(-1.5f, 4.0f) == Vec2Int(0, 0));
                }
            }
        }
    }
}
