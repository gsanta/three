#include "../src/app/core/colors.h"
#include "../src/app/document/drawing.h"
#include "../src/app/document/factory/document_factory.h"
#include "../test_helpers/drawing_builder.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

using namespace spright::editor;

SCENARIO("Drawing")
{
    GIVEN("a drawing")
    {
        Drawing drawing = DrawingBuilder()
                              .withFrame(FrameBuilder().withTileLayer(
                                             TileLayerBuilder()
                                                 .withTileSize(1)
                                                 .withBounds(Bounds::createWithPositions(-2.0f, 2.0f, -2.0f, 2.0f))
                                                 //   .withTile(Vec2Int(-5, 0), COLOR_RED)
                                                 .withTile(Vec2Int(0, 0), COLOR_RED)
                                                 .withTile(Vec2Int(1, 0), COLOR_RED)
                                                 .withTile(Vec2Int(1, 1), COLOR_RED)),
                                         2)
                              .build();

        Container container(Bounds(0, 0, 500, 500));
        DocumentFactory documentFactory = TestDocumentFactory::createDocumentFactory(container);

        WHEN("new size is smaller in x direction")
        {
            THEN("removes pixels beyond the new bounds")
            {
                drawing.resize(Bounds::createWithPositions(-1.0f, 1.0f, -2.0f, 2.0f));
                // documentFactory.resizeDrawing(drawing, Bounds::createWithPositions(-1.0f, 1.0f, -2.0f, 2.0f));

                REQUIRE(drawing.getFrame(0).getLayers()[0].getRenderables().size() == 2);
                REQUIRE(drawing.getFrame(0).getLayers()[0].getRenderables()[0]->getPosition2d() == Vec2(-1, -2));
                REQUIRE(drawing.getFrame(0).getLayers()[0].getRenderables()[1]->getPosition2d() == Vec2(-1, -1));
            }
        }

        WHEN("new size is smaller in y direction")
        {
            THEN("removes pixels beyond the new bounds")
            {
                drawing.resize(Bounds::createWithPositions(-1.0f, 1.0f, -1.0f, 1.0f));

                REQUIRE(drawing.getFrame(0).getLayers()[0].getRenderables().size() == 1);
                REQUIRE(drawing.getFrame(0).getLayers()[0].getRenderables()[0]->getPosition2d() == Vec2(-1, -1));
            }
        }
    }

    GIVEN("a drawing with frames")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame1(0);
        frame1.addLayer(layers[0]);
        Frame frame2(0);
        frame2.addLayer(layers[1]);


        Drawing drawing(Bounds::createWithPositions(-1.0f, 1.0f, -1.0f, 1.0f));

        drawing.addFrame(frame1);
        drawing.addFrame(frame2);

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
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame(0);
        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        Drawing drawing(Bounds::createWithPositions(-1.0f, 1.0f, -1.0f, 1.0f));

        drawing.addFrame(frame);

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
