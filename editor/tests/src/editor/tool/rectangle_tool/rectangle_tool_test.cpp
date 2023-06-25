
#include "../src/app/core/colors.h"
#include "../src/app/tool/rectangle_tool/rectangle_tool.h"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

TEST_CASE("RectangleTool", "[rectangle_tool]")
{
    using namespace ::spright::editor;

    SECTION("can draw a filled rectangle")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        RectangleTool rectTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(1, 1));
        toolContext.pointer.prev = toolContext.pointer.curr;

        rectTool.setFilled(true);

        rectTool.pointerDown(toolContext);

        toolContext.pointer.down = toolContext.pointer.prev = toolContext.pointer.curr;
        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 5));
        toolContext.pointer.isDown = true;

        rectTool.pointerMove(toolContext);

        rectTool.pointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 12);

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

    SECTION("can draw an outlined rectangle")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        RectangleTool rectTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(1, 1));
        toolContext.pointer.prev = toolContext.pointer.curr;

        rectTool.pointerDown(toolContext);

        toolContext.pointer.down = toolContext.pointer.prev = toolContext.pointer.curr;
        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 5));
        toolContext.pointer.isDown = true;

        rectTool.pointerMove(toolContext);

        rectTool.pointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 10);

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
