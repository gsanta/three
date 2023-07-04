#include "../src/app/core/colors.h"
#include "../src/app/document/drawing.h"
#include "../src/app/document/factory/document_factory.h"
#include "../test_helpers/drawing_builder.h"

#include <catch2/catch_test_macros.hpp>

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
                Drawing newDrawing =
                    documentFactory.resizeDrawing(drawing, Bounds::createWithPositions(-1.0f, 1.0f, -1.0f, 1.0f));

                REQUIRE(newDrawing.getFrame(0).getLayers()[0].getRenderables().size() == 1);
                REQUIRE(newDrawing.getFrame(0).getLayers()[0].getRenderables()[0]->getPosition2d() == Vec2(-1, -1));
            }
        }
    }
}
