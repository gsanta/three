
#include "../src/app/tool/tools/rectangle_tool/rectangle_tool.h"
#include "../src/engine/graphics/colors.h"
#include "src/editor/test_helpers/builders/document_store_builder.h"
#include "src/editor/test_helpers/builders/tool_context_builder.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

SCENARIO("Rectangle tool")
{
    using namespace ::spright::editor;

    GIVEN("an empty document and rectangle tool")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().build(documentStore.getActiveDocument());
        RectangleTool rectTool;

        WHEN("draw mode is filled")
        {
            rectTool.setFilled(true);

            THEN("it draws a filled rect")
            {
                TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing()->getActiveLayer();

                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(1, 1));
                toolContext.pointer.prev = toolContext.pointer.curr;

                rectTool.pointerDown(toolContext);

                toolContext.pointer.down = toolContext.pointer.prev = toolContext.pointer.curr;
                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(3, 4));
                toolContext.pointer.isDown = true;

                rectTool.pointerMove(toolContext);

                rectTool.pointerUp(toolContext);

                REQUIRE(layer.getTiles().size() == 12);

                REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 4) != nullptr);
            }
        }

        WHEN("draw mode is outline")
        {
            rectTool.setFilled(false);

            THEN("it draws a filled rect")
            {

                TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing()->getActiveLayer();

                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(1, 1));
                toolContext.pointer.prev = toolContext.pointer.curr;

                rectTool.pointerDown(toolContext);

                toolContext.pointer.down = toolContext.pointer.prev = toolContext.pointer.curr;
                toolContext.pointer.curr = layer.getCenterPos(Vec2Int(3, 4));
                toolContext.pointer.isDown = true;

                rectTool.pointerMove(toolContext);

                rectTool.pointerUp(toolContext);

                REQUIRE(layer.getTiles().size() == 10);

                REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 1) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(3, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(2, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 4) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 3) != nullptr);
                REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
            }
        }
    }
}
