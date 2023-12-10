#include "../../../../test_helpers/builders/document_builder.h"
#include "../../../../test_helpers/builders/tool_context_builder.h"
#include "../../../../test_helpers/common_tool_funcs.h"
#include "../src/editing/tool/tools/move_tool/move_tool.h"
#include "../src/editing/utils/conversions.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("Move tool")
{
    using namespace spright::editing;

    GIVEN("tile on the active layer, 3 tiles are selected")
    {
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(1, 0))
                                                                                .withTile(Vec2Int(1, 1))
                                                                                .withTile(Vec2Int(2, 1))
                                                                                .withTile(Vec2Int(2, 2))
                                                                                .withTile(Vec2Int(3, 3))
                                                                                .withTile(Vec2Int(4, 3))))
                                .build();
        TileCanvas &activeDrawing = get_active_tile_canvas(document);

        ToolContext toolContext = ToolContextBuilder().build(document);

        CommonToolFuncs commonToolFuncs(document, toolContext);

        TileLayer &toolLayer = activeDrawing.getToolLayer();
        TileLayer &activeLayer = activeDrawing.getActiveLayer();
        TileLayer &tempLayer = activeDrawing.getTempLayerOfActiveLayer();

        MoveTool moveTool;

        commonToolFuncs.selectRect(BoundsInt(1, 1, 2, 2));

        WHEN("mouse down on the selection")
        {
            commonToolFuncs.setPrevCurrDown(Vec2Int(1, 1));

            moveTool.pointerDown(toolContext);

            WHEN("moving the mouse")
            {
                toolContext.pointer.curr = toolLayer.getCenterPos(Vec2Int(3, 3));
                moveTool.pointerMove(toolContext);
                moveTool.pointerUp(toolContext);

                THEN("the selection highlight on the tool layer is moved")
                {
                    REQUIRE(toolLayer.getTiles().size() == 4);
                    REQUIRE(toolLayer.getAtTilePos(3, 3) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(4, 3) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(3, 4) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(4, 4) != nullptr);
                }

                THEN("the selected tiles on the temp layer are moved")
                {
                    REQUIRE(tempLayer.getTiles().size() == 3);
                    REQUIRE(tempLayer.getAtTilePos(3, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 4) != nullptr);
                }

                THEN("the selection buffer has the updated tile indexes")
                {
                    SelectionBuffer &buffer = toolContext.tools->getSelectTool().getSelectionBuffer();

                    REQUIRE(buffer.getTileIndexes().size() == 4);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 3)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 3)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 4)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 4)) == true);
                }

                WHEN("undoing the last action")
                {
                    document.getHistory()->undo(document);

                    THEN("it resets the selection highlight to the previous position")
                    {
                        REQUIRE(toolLayer.getTiles().size() == 4);
                        REQUIRE(toolLayer.getAtTilePos(1, 1) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(2, 1) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(1, 2) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(2, 2) != nullptr);
                    }

                    THEN("it resets the tiles to the previous position")
                    {
                        REQUIRE(activeLayer.getTiles().size() == 3);
                        REQUIRE(tempLayer.getAtTilePos(1, 1) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(2, 1) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(2, 2) != nullptr);
                    }

                    THEN("the selection buffer has the updated tile indexes")
                    {
                        SelectionBuffer &buffer = toolContext.tools->getSelectTool().getSelectionBuffer();

                        REQUIRE(buffer.getTileIndexes().size() == 4);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(1, 1)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(2, 1)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(1, 2)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(2, 2)) == true);
                    }
                }

                WHEN("moving the mouse again")
                {
                    Vec2 newPos = toolLayer.getCenterPos(Vec2Int(4, 3));
                    toolContext.pointer = PointerInfoBuilder().with(newPos, newPos, newPos).build();
                    moveTool.pointerDown(toolContext);
                    toolContext.pointer.isDown = true;
                    toolContext.pointer.curr = toolLayer.getCenterPos(Vec2Int(4, 5));
                    moveTool.pointerMove(toolContext);
                    moveTool.pointerUp(toolContext);

                    THEN("the selection highlight on the tool layer is moved")
                    {
                        REQUIRE(toolLayer.getTiles().size() == 4);
                        REQUIRE(toolLayer.getAtTilePos(3, 5) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(4, 5) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(3, 6) != nullptr);
                        REQUIRE(toolLayer.getAtTilePos(4, 6) != nullptr);
                    }


                    THEN("the selected tiles on the temp layer are moved")
                    {
                        REQUIRE(tempLayer.getTiles().size() == 3);
                        REQUIRE(tempLayer.getAtTilePos(3, 5) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(4, 5) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(4, 6) != nullptr);
                    }

                    THEN("the selection buffer has the updated tile indexes")
                    {
                        SelectionBuffer &buffer = toolContext.tools->getSelectTool().getSelectionBuffer();

                        REQUIRE(buffer.getTileIndexes().size() == 4);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 5)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 5)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 6)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 6)) == true);
                    }
                }
            }

            WHEN("executing multiple move actions without releasing the mouse")
            {
                toolContext.pointer.curr = toolLayer.getCenterPos(Vec2Int(3, 3));
                moveTool.pointerMove(toolContext);
                toolContext.pointer =
                    PointerInfoBuilder()
                        .with(toolLayer.getCenterPos(Vec2Int(5, 3)), toolContext.pointer.curr, toolContext.pointer.down)
                        .build();
                toolContext.pointer.isDown = true;
                moveTool.pointerMove(toolContext);
                moveTool.pointerUp(toolContext);

                THEN("the selection highlight on the tool layer is moved")
                {
                    REQUIRE(toolLayer.getTiles().size() == 4);
                    REQUIRE(toolLayer.getAtTilePos(5, 3) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(6, 3) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(5, 4) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(6, 4) != nullptr);
                }


                THEN("the selected tiles on the temp layer are moved")
                {
                    REQUIRE(tempLayer.getTiles().size() == 3);
                    REQUIRE(tempLayer.getAtTilePos(5, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 4) != nullptr);
                }

                THEN("the selection buffer has the updated tile indexes")
                {
                    SelectionBuffer &buffer = toolContext.tools->getSelectTool().getSelectionBuffer();

                    REQUIRE(buffer.getTileIndexes().size() == 4);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(5, 3)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(6, 3)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(5, 4)) == true);
                    REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(6, 4)) == true);
                }
            }
        }
    }
}
