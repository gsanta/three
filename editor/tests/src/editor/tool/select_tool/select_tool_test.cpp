#include "../../test_helpers/document_info_builder.h"
#include "../../test_helpers/document_store_builder.h"
#include "../../test_helpers/pointer_info_builder.h"
#include "../../test_helpers/tool_context_builder.h"
#include "../src/app/tool/select_tool/select_tool.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("Select tool")
{
    GIVEN("A select tool")
    {
        std::shared_ptr<DocumentStore> documentStore = std::make_shared<DocumentStore>(
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                .withTile(Vec2Int(1, 0))   // not selected
                                                                .withTile(Vec2Int(1, 1))   // first selection
                                                                .withTile(Vec2Int(2, 1))   // first selection
                                                                .withTile(Vec2Int(2, 2))   // first selection
                                                                .withTile(Vec2Int(3, 3))   // second selection
                                                                .withTile(Vec2Int(4, 3)))) // second selection
                .build());
        Drawing &activeDrawing = documentStore->getActiveDocument().getDrawings()[0];

        ToolContext toolContext =
            ToolContextBuilder().withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(&activeDrawing)).build();

        SelectTool selectTool(documentStore);

        WHEN("making a selection")
        {
            TileLayer &tempLayer = activeDrawing.getTempLayer();
            TileLayer &activeLayer = activeDrawing.getActiveLayer();

            Vec2 pointerPos = tempLayer.getCenterPos(Vec2Int(1, 1));
            toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

            selectTool.pointerDown(toolContext);
            toolContext.pointer.isDown = true;
            toolContext.pointer.curr = tempLayer.getCenterPos(Vec2Int(2, 2));
            selectTool.pointerMove(toolContext);
            selectTool.pointerUp(toolContext);

            THEN("it draws the selection to the temp layer")
            {
                REQUIRE(tempLayer.getTiles().size() == 4);
                REQUIRE(tempLayer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(tempLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(tempLayer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(tempLayer.getAtTilePos(2, 2) != nullptr);
            }

            THEN("it stores the selected tiles in the selection buffer")
            {
                SelectionBuffer buffer = selectTool.getSelectionBuffer();

                REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 3);
                REQUIRE(buffer.containsIndex(tempLayer.getTileIndex(1, 1)) == true);
                REQUIRE(buffer.containsIndex(tempLayer.getTileIndex(2, 1)) == true);
                REQUIRE(buffer.containsIndex(tempLayer.getTileIndex(2, 2)) == true);
            }

            WHEN("clicking outside of the selection")
            {
                Vec2 pointerPos = tempLayer.getCenterPos(Vec2Int(5, 5));

                toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

                selectTool.execPointerDown(toolContext);
                selectTool.execPointerUp(toolContext);

                THEN("it clears the selection")
                {
                    REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 0);
                    REQUIRE(tempLayer.getTiles().size() == 0);
                }
            }

            WHEN("making another selection")
            {
                Vec2 pointerPos = tempLayer.getCenterPos(Vec2Int(3, 3));
                toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

                selectTool.pointerDown(toolContext);
                toolContext.pointer.isDown = true;
                toolContext.pointer.curr = tempLayer.getCenterPos(Vec2Int(4, 4));
                selectTool.pointerMove(toolContext);
                selectTool.pointerUp(toolContext);

                THEN("it clears the previous selection")
                {
                    SelectionBuffer &buffer = selectTool.getSelectionBuffer();

                    REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 2);
                    REQUIRE(buffer.containsIndex(tempLayer.getTileIndex(3, 3)) == true);
                    REQUIRE(buffer.containsIndex(tempLayer.getTileIndex(4, 3)) == true);
                }
            }

            WHEN("mouse down on a selection")
            {
                Vec2 pointerPos = tempLayer.getCenterPos(Vec2Int(1, 1));
                toolContext.pointer = PointerInfoBuilder().with(pointerPos, pointerPos, pointerPos).build();

                selectTool.pointerDown(toolContext);
                toolContext.pointer.isDown = true;

                WHEN("moving the mouse")
                {
                    toolContext.pointer.curr = tempLayer.getCenterPos(Vec2Int(3, 3));
                    selectTool.pointerMove(toolContext);
                    selectTool.pointerUp(toolContext);

                    THEN("it moves the selected tiles")
                    {
                        SelectionBuffer &buffer = selectTool.getSelectionBuffer();

                        REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 3);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 3)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 3)) == true);
                        REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 4)) == true);
                    }

                    THEN("it moves the selection on temp layer")
                    {
                        REQUIRE(tempLayer.getTiles().size() == 4);
                        REQUIRE(tempLayer.getAtTilePos(3, 3) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(4, 3) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(3, 4) != nullptr);
                        REQUIRE(tempLayer.getAtTilePos(4, 4) != nullptr);
                    }

                    WHEN("moving the mouse again")
                    {
                        Vec2 newPos = tempLayer.getCenterPos(Vec2Int(4, 3));
                        toolContext.pointer = PointerInfoBuilder().with(newPos, newPos, newPos).build();
                        selectTool.pointerDown(toolContext);
                        toolContext.pointer.isDown = true;
                        toolContext.pointer.curr = tempLayer.getCenterPos(Vec2Int(4, 5));
                        selectTool.pointerMove(toolContext);
                        selectTool.pointerUp(toolContext);

                        THEN("it moves the selected tiles")
                        {
                            SelectionBuffer &buffer = selectTool.getSelectionBuffer();

                            REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 3);
                            REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(3, 5)) == true);
                            REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 5)) == true);
                            REQUIRE(buffer.containsIndex(activeLayer.getTileIndex(4, 6)) == true);
                        }

                        THEN("it moves the selection on temp layer")
                        {
                            REQUIRE(tempLayer.getTiles().size() == 4);
                            REQUIRE(tempLayer.getAtTilePos(3, 5) != nullptr);
                            REQUIRE(tempLayer.getAtTilePos(4, 5) != nullptr);
                            REQUIRE(tempLayer.getAtTilePos(3, 6) != nullptr);
                            REQUIRE(tempLayer.getAtTilePos(4, 6) != nullptr);
                        }
                    }
                }

                WHEN("executing multiple move actions without releasing the mouse")
                {
                    toolContext.pointer.curr = tempLayer.getCenterPos(Vec2Int(3, 3));
                    selectTool.pointerMove(toolContext);
                    toolContext.pointer = PointerInfoBuilder()
                                              .with(tempLayer.getCenterPos(Vec2Int(5, 3)),
                                                    toolContext.pointer.curr,
                                                    toolContext.pointer.down)
                                              .build();
                    toolContext.pointer.isDown = true;
                    selectTool.pointerMove(toolContext);
                    selectTool.pointerUp(toolContext);

                    THEN("it moves the selected tiles")
                    {
                        SelectionBuffer &buffer2 = selectTool.getSelectionBuffer();

                        REQUIRE(selectTool.getSelectionBuffer().getTileIndexes().size() == 3);
                        REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(5, 3)) == true);
                        REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(6, 3)) == true);
                        REQUIRE(selectTool.getSelectionBuffer().containsIndex(activeLayer.getTileIndex(6, 4)) == true);
                    }
                }
            }
        }
    }
}
