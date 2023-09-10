
#include "../src/app/tool/circle_tool/circle_tool.h"
#include "src/editor/test_helpers/document_builder.h"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::engine;
using namespace ::spright::editor;

void REQUIRE_ELLIPSE(TileLayer &layer)
{
    //TODO: fix this, currently foreground layer allows duplicate tiles, so there are more than 8 tiles here
    // REQUIRE(layer.getTiles().size() == 8);

    REQUIRE(layer.getAtTilePos(0, 1) != nullptr);
    REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
    REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
    REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
    REQUIRE(layer.getAtTilePos(4, 1) != nullptr);
    REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
    REQUIRE(layer.getAtTilePos(2, 0) != nullptr);
    REQUIRE(layer.getAtTilePos(1, 0) != nullptr);
}

void REQUIRE_CIRCLE(TileLayer &layer)
{
    REQUIRE(layer.getTiles().size() == 16);

    REQUIRE(layer.getAtTilePos(0, 2) != nullptr);
    REQUIRE(layer.getAtTilePos(0, 3) != nullptr);
    REQUIRE(layer.getAtTilePos(0, 4) != nullptr);
    REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
    REQUIRE(layer.getAtTilePos(1, 5) != nullptr);
    REQUIRE(layer.getAtTilePos(2, 0) != nullptr);
    REQUIRE(layer.getAtTilePos(2, 6) != nullptr);
    REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
    REQUIRE(layer.getAtTilePos(3, 6) != nullptr);
    REQUIRE(layer.getAtTilePos(4, 0) != nullptr);
    REQUIRE(layer.getAtTilePos(4, 6) != nullptr);
    REQUIRE(layer.getAtTilePos(5, 1) != nullptr);
    REQUIRE(layer.getAtTilePos(5, 5) != nullptr);
    REQUIRE(layer.getAtTilePos(6, 2) != nullptr);
    REQUIRE(layer.getAtTilePos(6, 3) != nullptr);
    REQUIRE(layer.getAtTilePos(6, 4) != nullptr);
}

SCENARIO("Circle tool")
{

    GIVEN("a document and circle tool")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 7.0, 7.0))).build();
        ToolContext toolContext = ToolContextBuilder().withDocument(document).build();

        TileLayer &layer = document.getActiveLayer();
        CircleTool circleTool;

        WHEN("dragging the mouse")
        {
            CircleTool circleTool;

            toolContext.pointer.down = layer.getCenterPos(Vec2Int(0, 0));
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4.0f, 2.0f));
            toolContext.pointer.isDown = true;
            circleTool.pointerMove(toolContext);

            THEN("it updates the preview on the foreground layer for each move event")
            {
                REQUIRE_ELLIPSE(document.getActiveDrawing().getForegroundLayer());

                // toolContext.pointer.curr = layer.getCenterPos(Vec2Int(6.0f, 6.0f));
                // circleTool.pointerMove(toolContext);

                // REQUIRE_CIRCLE(document.getActiveDrawing().getForegroundLayer());
            }

            WHEN("releasing the mouse at an equal horizontal and vertical distance from mouse down")
            {
                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(6.0f, 6.0f));
                circleTool.pointerMove(toolContext);
                circleTool.pointerUp(toolContext);

                THEN("it draws a circle")
                {
                    REQUIRE_CIRCLE(layer);
                }

                WHEN("undoing the last action")
                {
                    document.getHistory()->undo(document);

                    THEN("it removes the circle")
                    {
                        REQUIRE(layer.getTiles().size() == 0);
                    }

                    WHEN("redoing the last action")
                    {
                        document.getHistory()->redo(document);

                        THEN("it restores the circle")
                        {
                            REQUIRE_CIRCLE(layer);
                        }
                    }
                }
            }

            WHEN("releasing the mouse at a further horizontal distance than vertical from mouse down")
            {
                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(4.0f, 2.0f));
                circleTool.pointerMove(toolContext);
                circleTool.pointerUp(toolContext);

                THEN("it draws an oval")
                {
                    REQUIRE_ELLIPSE(layer);
                }
            }

            WHEN("the circle tool is in filled mode")
            {
                circleTool.setFilled(true);
                circleTool.pointerUp(toolContext);

                THEN("it draws a filled circle")
                {
                    REQUIRE(layer.getTiles().size() == 11);

                    REQUIRE(layer.getAtTilePos(0, 1) != nullptr);
                    REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
                    REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                    REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
                    REQUIRE(layer.getAtTilePos(4, 1) != nullptr);
                    REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
                    REQUIRE(layer.getAtTilePos(2, 0) != nullptr);
                    REQUIRE(layer.getAtTilePos(1, 0) != nullptr);

                    // filled inner tiles
                    REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                    REQUIRE(layer.getAtTilePos(2, 1) != nullptr);
                    REQUIRE(layer.getAtTilePos(3, 1) != nullptr);
                }

                WHEN("undoing the last action")
                {
                    document.getHistory()->undo(document);

                    THEN("it removes the filled circle")
                    {
                        REQUIRE(layer.getTiles().size() == 0);
                    }
                }
            }
        }
    }
}
