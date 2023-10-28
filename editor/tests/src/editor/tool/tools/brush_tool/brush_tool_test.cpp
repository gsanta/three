#include "../../../test_helpers/builders/document_builder.h"
#include "../../../test_helpers/builders/drawing_builder.h"
#include "../../../test_helpers/builders/tool_context_builder.h"
#include "../../../test_helpers/common_tool_funcs.h"
#include "../src/app/tool/tools/brush_tool/brush_tool.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("Brush tool")
{
    GIVEN("a brush tool with size 1")
    {
        float minX = -3.0;
        float minY = -4.0;
        float maxX = 3.0;
        float maxY = 2.0;

        Document document =
            DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(minX, minY, maxX, maxY))).build();
        BrushTool brushTool;
        ToolContext toolContext = ToolContextBuilder().build(document);

        CommonToolFuncs commonToolFuncs(document, toolContext);
        TileLayer &layer = document.getActiveDrawing()->getActiveLayer();
        TileLayer &cursorLayer = document.getActiveDrawing()->getCursorLayer();

        WHEN("clicking inside of the drawing's bounds")
        {
            float offset = 0.1;
            commonToolFuncs.clickAtPos(Vec2(maxX - offset, 0), brushTool);

            commonToolFuncs.clickAtPos(Vec2(minX + offset, 0), brushTool);

            commonToolFuncs.clickAtPos(Vec2(0, maxY - offset), brushTool);

            commonToolFuncs.clickAtPos(Vec2(0, minY + offset), brushTool);

            THEN("adds the tile to the layer")
            {
                REQUIRE(layer.getTiles().size() == 4);

                REQUIRE(layer.getAtTilePos(5, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(0, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 5) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
            }
        }

        WHEN("clicking outside of the drawing's bounds")
        {
            float offset = 0.1;
            commonToolFuncs.clickAtPos(Vec2(maxX + offset, 0), brushTool);

            commonToolFuncs.clickAtPos(Vec2(minX - offset, 0), brushTool);

            commonToolFuncs.clickAtPos(Vec2(0, maxY + offset), brushTool);

            commonToolFuncs.clickAtPos(Vec2(0, minY - offset), brushTool);

            THEN("does not add the tile to the layer")
            {
                REQUIRE(layer.getTiles().size() == 0);
            }

            THEN("does not create an undo action")
            {
                REQUIRE(document.getHistory()->undoSize() == 0);
            }
        }

        WHEN("drawing a sequence of pixels without releasing the mouse")
        {
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(1, 1));
            toolContext.pointer.down = toolContext.pointer.curr;

            toolContext.pointer.buttons[0] = true;
            brushTool.execPointerDown(toolContext);
            brushTool.execPointerMove(toolContext);

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(2, 1));
            brushTool.execPointerMove(toolContext);

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(2, 2));
            brushTool.execPointerMove(toolContext);
            brushTool.execPointerUp(toolContext);

            WHEN("calling undo")
            {
                THEN("it removes all of the pixels")
                {

                    document.getHistory()->undo(document);

                    REQUIRE(layer.getTiles().size() == 0);

                    WHEN("calling redo")
                    {
                        THEN("it restores all of the pixels")
                        {
                            document.getHistory()->redo(document);

                            REQUIRE(layer.getTiles().size() == 3);
                            REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                            REQUIRE(layer.getAtTilePos(2, 1) != nullptr);
                            REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                        }
                    }
                }
            }
        }

        WHEN("brush tool size is 3")
        {
            brushTool.setSize(3);

            commonToolFuncs.setPrevCurrDown(Vec2(1.5, 0));
            // brushTool.execPointerDown(toolContext);
            brushTool.execPointerMove(toolContext);

            THEN("the cursor size is changed")
            {
                REQUIRE(cursorLayer.getTiles().size() == 1);
            }

            WHEN("clicking inside of the drawing's bounds")
            {
                brushTool.execPointerDown(toolContext);
                brushTool.execPointerUp(toolContext);

                THEN("adds the tile to the layer")
                {
                    REQUIRE(layer.getTiles().size() == 9);

                    for (float x = 0; x < 3; x++)
                    {
                        for (float y = -1; y < 2; y++)
                        {
                            REQUIRE(layer.getAtWorldPos(Vec2(x, y)) != nullptr);
                        }
                    }
                }
            }

            WHEN("clicking near the edge of the drawing's bounds")
            {
                commonToolFuncs.setPrevCurrDown(Vec2(2.5, 0));
                brushTool.execPointerDown(toolContext);
                brushTool.execPointerUp(toolContext);

                THEN("adds only those tiles that are within the layer")
                {
                    REQUIRE(layer.getTiles().size() == 6);

                    for (float x = 1; x < 3; x++)
                    {
                        for (float y = -1; y < 2; y++)
                        {
                            REQUIRE(layer.getAtWorldPos(Vec2(x, y)) != nullptr);
                        }
                    }
                }
            }
        }
    }
}
