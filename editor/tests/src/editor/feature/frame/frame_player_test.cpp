
#include "../../test_helpers/builders/drawing_builder.h"
#include "../../test_helpers/builders/frame_builder.h"
#include "../src/features/frame/frame_player.cpp"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;
using namespace spright::features;

SCENARIO("Frame player")
{
    FramePlayer framePlayer;
    framePlayer.setIsActive(true);
    framePlayer.setDuration(500.0f);

    GIVEN("a drawing with two frames")
    {
        Drawing drawing = DrawingBuilder().withFrame(FrameBuilder(), 2).build();
        framePlayer.setDrawing(&drawing);

        WHEN("update does not exceed frame duration")
        {
            framePlayer.update(499);

            THEN("the active frame remains")
            {
                REQUIRE(drawing.getActiveFrame().getIndex() == 0);
            }

            WHEN("update exceeds frame duration")
            {
                framePlayer.update(2);

                THEN("the next frame becomes active")
                {
                    REQUIRE(drawing.getActiveFrame().getIndex() == 1);
                }

                WHEN("the last frame is active")
                {
                    framePlayer.update(500);

                    THEN("the next active frame is the first one")
                    {
                        REQUIRE(drawing.getActiveFrame().getIndex() == 0);
                    }
                }
            }
        }
    }

    GIVEN("a drawing with three frames")
    {
        Drawing drawing = DrawingBuilder().withFrame(FrameBuilder(), 3).build();
        framePlayer.setDrawing(&drawing);

        WHEN("update exceeds multiple durations")
        {
            THEN("activates the correct frame")
            {
                framePlayer.update(1001);

                REQUIRE(drawing.getActiveFrame().getIndex() == 2);
            }
        }
    }
}
