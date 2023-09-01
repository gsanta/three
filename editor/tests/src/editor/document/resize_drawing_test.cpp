#include "../src/app/core/colors.h"
#include "../src/app/document/drawing.h"
#include "../src/app/document/factory/document_factory.h"
#include "../src/app/document/resize_drawing.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "../test_helpers/drawing_builder.h"

#include <catch2/catch_test_macros.hpp>
using namespace spright::editor;

SCENARIO("Resize drawing")
{
    GIVEN("the user resizes the drawing")
    {
        HeadlessWindow window(4, 4);
        DocumentFactory documentFactory = TestDocumentFactory::createDocumentFactory(window);

        WHEN("new size is smaller than the previous")
        {
            Drawing drawing = DrawingBuilder()
                                  .withFrame(FrameBuilder().withTileLayer(
                                                 TileLayerBuilder()
                                                     .withTileSize(1)
                                                     .withBounds(Bounds::createWithPositions(-2.0f, -2.0f, 2.0f, 2.0f))
                                                     //   .withTile(Vec2Int(-5, 0), COLOR_RED)
                                                     .withTile(Vec2Int(0, 0), COLOR_RED)
                                                     .withTile(Vec2Int(1, 0), COLOR_RED)
                                                     .withTile(Vec2Int(1, 1), COLOR_RED)),
                                             2)
                                  .build();

            WHEN("new size is smaller in x direction")
            {
                THEN("removes pixels beyond the new bounds")
                {
                    drawing = resize_drawing(drawing,
                                             Bounds::createWithPositions(-1.0f, -2.0f, 1.0f, 2.0f),
                                             &documentFactory);

                    REQUIRE(drawing.getFrame(0).getLayers()[0].getTiles().size() == 2);
                    REQUIRE(drawing.getFrame(0).getLayers()[0].getTiles()[0]->getPosition2d() == Vec2(-1, -2));
                    REQUIRE(drawing.getFrame(0).getLayers()[0].getTiles()[1]->getPosition2d() == Vec2(-1, -1));
                }
            }

            WHEN("new size is smaller in y direction")
            {
                THEN("removes pixels beyond the new bounds")
                {
                    drawing = resize_drawing(drawing,
                                             Bounds::createWithPositions(-1.0f, -1.0f, 1.0f, 1.0f),
                                             &documentFactory);

                    REQUIRE(drawing.getFrame(0).getLayers()[0].getTiles().size() == 1);
                    REQUIRE(drawing.getFrame(0).getLayers()[0].getTiles()[0]->getPosition2d() == Vec2(-1, -1));
                }
            }
        }

        WHEN("new size is bigger than the previous")
        {
            THEN("checkerboard fills the new canvas size")
            {
                Drawing drawing = DrawingBuilder()
                                      .withBounds(Bounds::createWithPositions(-1.0f, -1.0f, 1.0f, 1.0f))
                                      .withBackgroundLayerTileSize(1.0f)
                                      .build();

                drawing =
                    resize_drawing(drawing, Bounds::createWithPositions(-2.0f, -2.0f, 1.0f, 1.0f), &documentFactory);

                REQUIRE(drawing.getBackgroundLayer().getTiles().size() == 9);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(0)->getColor() == COLOR_DARK_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(1)->getColor() == COLOR_LIGHT_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(2)->getColor() == COLOR_DARK_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(3)->getColor() == COLOR_LIGHT_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(4)->getColor() == COLOR_DARK_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(5)->getColor() == COLOR_LIGHT_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(6)->getColor() == COLOR_DARK_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(7)->getColor() == COLOR_LIGHT_GREY);
                REQUIRE(drawing.getBackgroundLayer().getAtTileIndex(8)->getColor() == COLOR_DARK_GREY);
            }
        }
    }
}
