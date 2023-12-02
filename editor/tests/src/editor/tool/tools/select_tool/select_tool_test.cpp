#include "../../../test_helpers/builders/document_builder.h"
#include "../../../test_helpers/builders/pointer_info_builder.h"
#include "../../../test_helpers/builders/tool_context_builder.h"
#include "../../../test_helpers/common_tool_funcs.h"
#include "../src/editing/tool/tools/select_tool/select_tool.h"
#include "../src/engine/graphics/colors.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("Select tool")
{
    GIVEN("a drawing with tiles")
    {
        Document document =
            DocumentBuilder()
                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                .withTile(Vec2Int(1, 0))   // not selected
                                                                .withTile(Vec2Int(1, 1))   // first selection
                                                                .withTile(Vec2Int(2, 1))   // first selection
                                                                .withTile(Vec2Int(2, 2))   // first selection
                                                                .withTile(Vec2Int(3, 3))   // second selection
                                                                .withTile(Vec2Int(4, 3)))) // second selection
                .build();
        Drawing &activeDrawing = *document.getActiveDrawing();

        ToolContext toolContext = ToolContextBuilder().build(document);

        SelectTool selectTool;

        WHEN("making a selection")
        {
            TileLayer &toolLayer = activeDrawing.getToolLayer();
            TileLayer &activeLayer = activeDrawing.getActiveLayer();
            TileLayer &tempLayer = activeDrawing.getTempLayerOfActiveLayer();

            Vec2 pointerPos = toolLayer.getCenterPos(Vec2Int(1, 1));
            toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

            selectTool.pointerDown(toolContext);
            toolContext.pointer.isDown = true;
            toolContext.pointer.curr = toolLayer.getCenterPos(Vec2Int(2, 2));
            selectTool.pointerMove(toolContext);
            selectTool.pointerUp(toolContext);

            THEN("it draws the selection to the tool layer")
            {
                REQUIRE(toolLayer.getTiles().size() == 4);
                REQUIRE(toolLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(toolLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(toolLayer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(toolLayer.getAtTilePos(2, 2) != nullptr);
            }

            THEN("it stores the selected tiles in the selection buffer")
            {
                SelectionBuffer buffer = selectTool.getSelectionBuffer();

                REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 4);
                REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(1, 1)) == true);
                REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(2, 1)) == true);
                REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(1, 2)) == true);
                REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(2, 2)) == true);
            }

            THEN("it transfers the selected tiles from the active layer to the temp layer")
            {
                REQUIRE(activeLayer.getTiles().size() == 3);
                REQUIRE(tempLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(tempLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(tempLayer.getAtTilePos(2, 2) != nullptr);

                REQUIRE(activeLayer.getTiles().size() == 3);
                REQUIRE(activeLayer.getAtTilePos(1, 0) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(3, 3) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(4, 3) != nullptr);
            }

            WHEN("clicking outside of the selection")
            {
                Vec2 pointerPos = toolLayer.getCenterPos(Vec2Int(5, 5));

                toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

                selectTool.execPointerDown(toolContext);
                selectTool.execPointerUp(toolContext);

                THEN("it clears the selection")
                {
                    REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 0);
                    REQUIRE(toolLayer.getTiles().size() == 0);
                }

                THEN("it transfers the selected tiles from the temp layer back to the active layer")
                {
                    REQUIRE(activeLayer.getTiles().size() == 6);

                    REQUIRE(activeLayer.getAtTilePos(1, 1) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 1) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 2) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(1, 0) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(3, 3) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(4, 3) != nullptr);
                }
            }

            WHEN("making another selection")
            {
                Vec2 pointerPos = toolLayer.getCenterPos(Vec2Int(3, 3));
                toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

                selectTool.pointerDown(toolContext);
                toolContext.pointer.isDown = true;
                toolContext.pointer.curr = toolLayer.getCenterPos(Vec2Int(4, 4));
                selectTool.pointerMove(toolContext);
                selectTool.pointerUp(toolContext);

                THEN("it clears the previous selection")
                {
                    SelectionBuffer &buffer = selectTool.getSelectionBuffer();

                    REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 4);
                    REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(3, 3)) == true);
                    REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(4, 3)) == true);
                    REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(3, 4)) == true);
                    REQUIRE(buffer.containsIndex(toolLayer.getTileIndex(4, 4)) == true);
                }
            }
        }
    }

    GIVEN("a drawing with tiles with different colors")
    {
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(1, 0), COLOR_RED)
                                                                                .withTile(Vec2Int(1, 1), COLOR_RED)
                                                                                .withTile(Vec2Int(2, 1), COLOR_RED)
                                                                                .withTile(Vec2Int(2, 2), COLOR_RED)
                                                                                .withTile(Vec2Int(3, 2), COLOR_BLUE)
                                                                                .withTile(Vec2Int(4, 2), COLOR_RED)))
                                .build();
        Drawing &activeDrawing = *document.getActiveDrawing();
        ToolContext toolContext = ToolContextBuilder().build(document);

        CommonToolFuncs commonToolFuncs(document, toolContext);

        SelectTool selectTool;
        TileLayer &activeLayer = activeDrawing.getActiveLayer();
        TileLayer &toolLayer = activeDrawing.getToolLayer();
        TileLayer &tempLayer = activeDrawing.getTempLayerOfActiveLayer();

        WHEN("selection type is wand")
        {
            selectTool.setSelectionType(wand);

            WHEN("clicking with the mouse on a tile")
            {
                commonToolFuncs.setPrevCurrDown(Vec2Int(1, 1));
                selectTool.pointerDown(toolContext);
                selectTool.pointerUp(toolContext);

                THEN("it selects all connecting tiles with the same color")
                {
                    REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 4);

                    REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(1, 1)) == true);
                    REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(1, 0)) == true);
                    REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(2, 1)) == true);
                    REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(2, 2)) == true);
                }

                THEN("it draws the selection on the temp layer")
                {
                    REQUIRE(toolLayer.getTiles().size() == 4);
                    REQUIRE(toolLayer.getAtTilePos(1, 1) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(1, 0) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(2, 1) != nullptr);
                    REQUIRE(toolLayer.getAtTilePos(2, 2) != nullptr);
                }

                WHEN("clicking on another color")
                {
                    commonToolFuncs.setPrevCurrDown(Vec2Int(3, 2));
                    selectTool.pointerDown(toolContext);
                    selectTool.pointerUp(toolContext);

                    THEN("deselects the previous tiles")
                    {
                        REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 1);
                        REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(3, 2)) == true);

                        REQUIRE(toolLayer.getTiles().size() == 1);
                        REQUIRE(toolLayer.getAtTilePos(3, 2) != nullptr);
                    }
                }
            }
        }
    }
}
