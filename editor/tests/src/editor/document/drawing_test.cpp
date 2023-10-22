#include "../src/app/document/drawing.h"
#include "../src/app/document/factory/document_factory.h"
#include "../test_helpers/builders/drawing_builder.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

using namespace spright::editor;

SCENARIO("Drawing")
{
    GIVEN("a drawing with frames")
    {
        Drawing drawing = DrawingBuilder()
                              .withFrame(FrameBuilder().withTileLayer(TileLayerBuilder()))
                              .withFrame(FrameBuilder().withTileLayer(TileLayerBuilder()))
                              .build();

        WHEN("getting a frame by index")
        {
            THEN("returns the frame")
            {
                REQUIRE(drawing.getFrame(0).getIndex() == 0);
                REQUIRE(drawing.getFrame(1).getIndex() == 1);
            }

            THEN("throws if index is out of bounds")
            {

                REQUIRE_THROWS_WITH(drawing.getFrame(2), "Frame with index 2 not found");
            }
        }

        WHEN("there is an active frame")
        {
            THEN("it can return it")
            {
                REQUIRE(drawing.getActiveFrame().getIndex() == 0);
            }
        }

        WHEN("setting a new frame as active")
        {
            drawing.setActiveFrame(1);

            THEN("the active frame changes")
            {
                REQUIRE(drawing.getActiveFrame().getIndex() == 1);
            }
        }

        WHEN("there is only one frame left")
        {
            drawing.removeFrame(0);

            THEN("it can not be removed")
            {
                REQUIRE_THROWS_WITH(drawing.removeFrame(0), "The last frame can not be removed");
            }
        }
    }

    GIVEN("a drawing with layers")
    {
        Drawing drawing =
            DrawingBuilder()
                .withFrame(FrameBuilder().withTileLayer(TileLayerBuilder()).withTileLayer(TileLayerBuilder()))
                .build();

        WHEN("there is an active layer")
        {
            THEN("can return it")
            {
                REQUIRE(drawing.getActiveLayer().getIndex() == 0);
            }
        }

        WHEN("setting a new layer as active")
        {
            THEN("the active layer changes")
            {
                drawing.setActiveLayer(1);

                REQUIRE(drawing.getActiveLayer().getIndex() == 1);
            }
        }
    }
}
