#include "../../../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../../../test_helpers/builders/document_builder.h"
#include "../../../test_helpers/builders/document_store_builder.h"
#include "../../../test_helpers/builders/drawing_builder.h"
#include "../../../test_helpers/builders/pointer_info_builder.h"
#include "../../../test_helpers/builders/tile_layer_builder.h"
#include "../../../test_helpers/builders/tool_context_builder.h"
#include "../../../test_helpers/test_document_factory.h"
#include "../src/editing/document/document_store.h"
#include "../src/editing/document/factory/document_factory.h"
#include "../src/editing/tool/context/tool_context.h"
#include "../src/editing/tool/tools/brush_tool/brush.h"
#include "../src/editing/tool/tools/eraser_tool/eraser_tool.h"
#include "../src/engine/graphics/mesh/meshes/rect2d.h"
#include "../src/engine/graphics/renderer/headless/headless_renderer2d.h"
#include "../src/engine/scene/containers/group.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::engine;
using namespace spright::editing;

SCENARIO("Erase tool")
{
    GIVEN("a document with an active layer with pixels")
    {
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(0, 0))
                                                                                .withTile(Vec2Int(1, 0))
                                                                                .withTile(Vec2Int(2, 0))
                                                                                .withTile(Vec2Int(0, 1))
                                                                                .withTile(Vec2Int(1, 1))
                                                                                .withTile(Vec2Int(2, 1))
                                                                                .withTile(Vec2Int(0, 2))
                                                                                .withTile(Vec2Int(1, 2))
                                                                                .withTile(Vec2Int(2, 2))))
                                .build();
        TileLayer &activeLayer = document.getActiveDrawing()->getActiveLayer();

        ToolContext toolContext =
            ToolContextBuilder()
                .withPointerInfo(PointerInfoBuilder().withCurr(activeLayer.getCenterPos(Vec2Int(1, 1))))
                .build(document);
        toolContext.doc.document = &document;

        EraserTool eraseTool(1);

        WHEN("clicking with the erase tool")
        {
            eraseTool.execPointerDown(toolContext);

            THEN("it erases the pixels at the click position")
            {
                REQUIRE(activeLayer.getTiles().size() == 8);
                REQUIRE(activeLayer.getAtTilePos(0, 0) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(1, 0) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(2, 0) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(0, 1) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(1, 1) == nullptr);
                REQUIRE(activeLayer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(0, 2) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(activeLayer.getAtTilePos(2, 2) != nullptr);
            }

            WHEN("undoing the last action")
            {
                document.getHistory()->undo(document);

                THEN("it restores the erased pixels")
                {

                    REQUIRE(activeLayer.getTiles().size() == 9);
                    REQUIRE(activeLayer.getAtTilePos(1, 1) != nullptr);
                }

                WHEN("redoing the last action")
                {
                    THEN("it removes the previously restored pixels")
                    {
                        document.getHistory()->redo(document);

                        REQUIRE(activeLayer.getTiles().size() == 8);
                        REQUIRE(activeLayer.getAtTilePos(1, 1) == nullptr);
                    }
                }
            }
        }

        WHEN("dragging with the erase tool")
        {
            toolContext.pointer.curr = activeLayer.getCenterPos(Vec2Int(1, 0));
            toolContext.pointer.down = toolContext.pointer.curr;
            toolContext.pointer.isDown = true;

            eraseTool.execPointerDown(toolContext);
            eraseTool.execPointerMove(toolContext);

            toolContext.pointer.curr = activeLayer.getCenterPos(Vec2Int(2, 0));
            eraseTool.execPointerMove(toolContext);

            toolContext.pointer.curr = activeLayer.getCenterPos(Vec2Int(2, 1));
            eraseTool.execPointerMove(toolContext);
            eraseTool.execPointerUp(toolContext);

            THEN("it erases the pixels at the drag positions")
            {
                REQUIRE(activeLayer.getTiles().size() == 6);
                REQUIRE(activeLayer.getAtTilePos(1, 0) == nullptr);
                REQUIRE(activeLayer.getAtTilePos(2, 0) == nullptr);
                REQUIRE(activeLayer.getAtTilePos(2, 1) == nullptr);
            }

            WHEN("undoing the last action")
            {
                document.getHistory()->undo(document);

                THEN("it restores all of the pixels erased during the drag")
                {
                    REQUIRE(activeLayer.getTiles().size() == 9);
                    REQUIRE(activeLayer.getAtTilePos(1, 0) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 0) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 1) != nullptr);
                }
            }
        }
    }

    GIVEN("an empty document")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 4, 4))).build();
        TileLayer &cursorLayer = document.getActiveDrawing()->getCursorLayer();

        ToolContext toolContext = ToolContextBuilder().build(document);

        EraserTool eraseTool(1);

        WHEN("moving the mouse")
        {
            toolContext.pointer.curr = cursorLayer.getCenterPos(Vec2Int(2, 1));
            eraseTool.execPointerMove(toolContext);

            THEN("erase tool cursor follows the mouse")
            {
                REQUIRE(cursorLayer.getTiles().size() == 1);

                REQUIRE_THAT(cursorLayer.getTiles()[0]->getBounds(),
                             EqualsBounds(Bounds::createWithSize(2.0f, 1, 1.0f, 1.0f)));

                toolContext.pointer.curr = cursorLayer.getCenterPos(Vec2Int(3, 1));
                eraseTool.execPointerMove(toolContext);

                REQUIRE(cursorLayer.getTiles().size() == 1);

                REQUIRE_THAT(cursorLayer.getTiles()[0]->getBounds(),
                             EqualsBounds(Bounds::createWithSize(3.0f, 1.0f, 1.0f, 1.0f)));

                toolContext.pointer.curr = cursorLayer.getCenterPos(Vec2Int(3, 2));
                eraseTool.execPointerMove(toolContext);

                REQUIRE(cursorLayer.getTiles().size() == 1);
                EqualsBounds(Bounds::createWithSize(3.0f, 2.0f, 1.0f, 1.0f));
            }
        }
    }
}
