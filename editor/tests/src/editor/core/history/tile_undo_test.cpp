#include "../../test_helpers/builders/tile_builder.h"
#include "../../test_helpers/builders/document_builder.h"
#include "../../test_helpers/builders/drawing_builder.h"
#include "../../test_helpers/builders/tile_layer_builder.h"
#include "../../test_helpers/builders/tool_context_builder.h"
#include "../src/app/core/colors.h"
#include "../src/app/core/history/tile_undo.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("TileUndo")
{
    Document document = DocumentBuilder().build();

    Drawing drawing = DrawingBuilder()
                          .withFrame(FrameBuilder().withTileLayer(TileLayerBuilder().withTileSize(1).withBounds(
                                         Bounds::createWithPositions(-3.0f, -3.0f, 4.0f, 4.0f))),
                                     2)
                          .build();

    ToolContext context = ToolContextBuilder().build(document);

    document.addDrawing(drawing);

    TileLayer &layer = document.getActiveDrawing().getActiveLayer();

    TileBuilder tileBuilder(layer);

    layer.add(tileBuilder.withPos(Vec2Int(0, 0)).withColor(COLOR_RED).build());
    layer.add(tileBuilder.withPos(Vec2Int(1, 0)).withColor(COLOR_RED).build());
    layer.add(tileBuilder.withPos(Vec2Int(0, 1)).withColor(COLOR_RED).build());

    GIVEN("an undoable action for a tile layer")
    {
        TileUndo tileUndo = TileUndo::createForActiveTileLayer(document, context.tools);

        Rect2D *prevRect1 = layer.getAtTilePos(1, 0);
        Rect2D nextRect1 = tileBuilder.withPos(Vec2Int(1, 0)).withColor(COLOR_YELLOW).build();
        tileUndo.addTile(std::make_shared<Rect2D>(*prevRect1), std::make_shared<Rect2D>(nextRect1));
        layer.add(nextRect1);

        Rect2D nextRect2 = tileBuilder.withPos(Vec2Int(1, 1)).withColor(COLOR_YELLOW).build();
        tileUndo.addTile(std::shared_ptr<Rect2D>(nullptr), std::make_shared<Rect2D>(nextRect2));
        layer.add(nextRect2);

        WHEN("undo is called")
        {
            THEN("it undoes the changes on the tile layer")
            {
                tileUndo.undo(document);

                REQUIRE(layer.getTiles().size() == 3);
                REQUIRE(layer.getTiles()[0]->getColor() == COLOR_RED);
                REQUIRE(layer.getTiles()[1]->getColor() == COLOR_RED);
                REQUIRE(layer.getTiles()[2]->getColor() == COLOR_RED);
            }
        }

        WHEN("redo is called")
        {
            THEN("it redoes the changes on the tile layer")
            {
                tileUndo.undo(document);
                tileUndo.redo(document);

                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(0, 0)->getColor() == COLOR_RED);
                REQUIRE(layer.getAtTilePos(0, 1)->getColor() == COLOR_RED);
                REQUIRE(layer.getAtTilePos(1, 0)->getColor() == COLOR_YELLOW);
                REQUIRE(layer.getAtTilePos(1, 1)->getColor() == COLOR_YELLOW);
            }
        }
    }
}
