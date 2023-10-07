
#include "../src/app/core/colors.h"
#include "../src/app/tool/line_tool/line_tool.h"
#include "catch2/catch_test_macros.hpp"
#include "src/editor/test_helpers/document_builder.h"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

using namespace spright::editor;

SCENARIO("Line tool")
{
    GIVEN("an empty drawing and a line tool")
    {
        Document document = DocumentBuilder().build();
        ToolContext toolContext = ToolContextBuilder().build(document);

        TileLayer &layer = document.getActiveLayer();

        LineTool lineTool;

        WHEN("dragging in a perfect diagonal direction")
        {
            toolContext.pointer.down = layer.getCenterPos(Vec2Int(0, 0));

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 4));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a perfect diagonal line")
            {
                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 3) != nullptr);
            }

            WHEN("undoing the last action")
            {
                document.getHistory()->undo(document);

                THEN("it removes the line")
                {
                    REQUIRE(layer.getTiles().size() == 0);
                }

                WHEN("redoing the last action")
                {
                    document.getHistory()->redo(document);

                    THEN("it restores the line")
                    {
                        REQUIRE(layer.getTiles().size() == 4);
                    }
                }
            }
        }

        WHEN("dragging in the horizontal direction")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 0));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a horizontal line")
            {
                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
            }
        }

        WHEN("dragging in the vertical direction")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 5));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a vertical line")
            {
                REQUIRE(layer.getTiles().size() == 5);
                REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(0, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(0, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(0, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(0, 4) != nullptr);
            }
        }

        WHEN("Dragging in the positive direction more horizontally than vertically")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 3));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a line which is longer than high")
            {
                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
            }
        }

        WHEN("Dragging in the negative direction more horizontally than vertically")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 3));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a line which is longer than high in the negative direction")
            {
                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(4, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
            }
        }

        WHEN("Dragging in the positive direction more vertically than horizontally")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(2, 4));

            lineTool.execPointerMove(toolContext);
            lineTool.execPointerUp(toolContext);

            THEN("it draws a line which is higher than long")
            {
                REQUIRE(layer.getTiles().size() == 4);
                REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 3) != nullptr);
            }
        }

        WHEN("drag is in progress")
        {
            TileLayer &foregroundLayer = document.getActiveDrawing().getTempLayer();

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.down = toolContext.pointer.curr;

            lineTool.execPointerDown(toolContext);

            toolContext.pointer.isDown = true;

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 4));

            lineTool.execPointerMove(toolContext);

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4, 0));

            lineTool.execPointerMove(toolContext);

            THEN("it draws to the foreground layer")
            {
                REQUIRE(layer.getTiles().size() == 0);
                REQUIRE(foregroundLayer.getTiles().size() == 4);
            }

            WHEN("dragging ends")
            {
                lineTool.execPointerUp(toolContext);

                THEN("draws to the active layer and clears the foreground layer")
                {
                    REQUIRE(layer.getTiles().size() == 4);
                    REQUIRE(foregroundLayer.getTiles().size() == 0);
                }
            }
        }
    }
}
