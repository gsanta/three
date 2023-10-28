
#include "../src/app/core/colors.h"
#include "../src/app/tool/tools/paint_bucket_tool/paint_bucket_tool.h"
#include "src/editor/test_helpers/builders/document_builder.h"
#include "src/editor/test_helpers/builders/document_store_builder.h"
#include "src/editor/test_helpers/builders/tool_context_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

SCENARIO("Paint bucket tool")
{

    GIVEN("an empty drawing")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 2, 2))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);

        PaintBucketTool paintBucketTool;

        WHEN("clicking on the drawing with the paint bucket tool")
        {
            toolContext.tools->getColorPickerTool().setColor(COLOR_SPRIGHT_ORANGE);
            paintBucketTool.execPointerUp(toolContext);

            THEN("the entire drawing gets filled")
            {
                TileLayer &layer = document.getActiveDrawing()->getActiveLayer();

                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getTiles()[0]->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getTiles()[1]->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getTiles()[2]->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getTiles()[3]->getColor() == COLOR_SPRIGHT_ORANGE);
            }
        }
    }

    GIVEN("a drawing with a continues area drawn onto it")
    {
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(0, 1))
                                                                                .withTile(Vec2Int(0, 2))
                                                                                .withTile(Vec2Int(0, 3))
                                                                                .withTile(Vec2Int(1, 3))
                                                                                .withTile(Vec2Int(2, 3))
                                                                                .withTile(Vec2Int(3, 3))
                                                                                .withTile(Vec2Int(3, 2))
                                                                                .withTile(Vec2Int(3, 1))
                                                                                .withTile(Vec2Int(3, 0))
                                                                                .withTile(Vec2Int(2, 0))
                                                                                .withTile(Vec2Int(1, 0))
                                                                                .withTile(Vec2Int(0, 0))))
                                .build();
        ToolContext toolContext = ToolContextBuilder().build(document);

        TileLayer &layer = document.getActiveDrawing()->getActiveLayer();

        PaintBucketTool paintBucketTool;

        WHEN("clicking in the middle of the continues area")
        {

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(1, 1));
            toolContext.tools->getColorPickerTool().setColor(COLOR_SPRIGHT_ORANGE);

            paintBucketTool.execPointerUp(toolContext);

            THEN("it fills that area")
            {
                REQUIRE(layer.getTiles().size() == 16);
                REQUIRE(layer.getAtTilePos(1, 1)->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getAtTilePos(1, 2)->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getAtTilePos(2, 1)->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getAtTilePos(2, 2)->getColor() == COLOR_SPRIGHT_ORANGE);
                REQUIRE(layer.getAtTilePos(4, 2) == nullptr);
            }

            WHEN("undoing the last action")
            {
                document.getHistory()->undo(document);

                THEN("it removes the fill")
                {
                    REQUIRE(layer.getTiles().size() == 12);
                    REQUIRE(layer.getAtTilePos(1, 1) == nullptr);
                    REQUIRE(layer.getAtTilePos(1, 2) == nullptr);
                    REQUIRE(layer.getAtTilePos(2, 1) == nullptr);
                    REQUIRE(layer.getAtTilePos(2, 2) == nullptr);
                }

                WHEN("redoing the last action")
                {
                    document.getHistory()->redo(document);

                    THEN("it re-applies the removed fill")
                    {
                        REQUIRE(layer.getTiles().size() == 16);
                    }
                }
            }
        }
    }
}
