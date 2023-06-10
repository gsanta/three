
#include "../src/app/core/colors.h"
#include "../src/app/tool/line_tool/line_tool.h"
#include "catch2/catch_test_macros.hpp"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

using namespace spright::editor;

TEST_CASE("LineTool", "[line-tool]")
{
    SECTION("can draw a straight horizontal line")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 0));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(3, 0) != nullptr);
    }

    SECTION("can draw a straight vertical line")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 5));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 5);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(0, 1) != nullptr);
        REQUIRE(layer.getAtTilePos(0, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(0, 3) != nullptr);
        REQUIRE(layer.getAtTilePos(0, 4) != nullptr);
    }


    SECTION("can draw a perfect diagonal line")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.down = layer.getWorldPos(Vec2Int(0, 0));

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 4));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(3, 3) != nullptr);
    }

    SECTION("can draw a diagonal line in the positive direction where line width is bigger than it's height")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 3));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(3, 2) != nullptr);
    }

    SECTION("can draw a diagonal line in the negative direction where line width is bigger than it's height")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(4, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 3));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getAtTilePos(4, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(3, 1) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
    }

    SECTION("can draw a diagonal line in the positive direction where line height is bigger than it's width")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = layer.getWorldPos(Vec2Int(2, 4));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 2) != nullptr);
        REQUIRE(layer.getAtTilePos(2, 3) != nullptr);
    }

    SECTION("draws to the foreground layer when pointerMove")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &activeLayer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();
        TileLayer &foregroundLayer = documentStore.getActiveDocument().getActiveDrawing().getForegroundLayer();

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(4, 4));

        lineTool.execPointerMove(toolContext);

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(4, 0));

        lineTool.execPointerMove(toolContext);

        REQUIRE(activeLayer.getRenderables().size() == 0);
        REQUIRE(foregroundLayer.getRenderables().size() == 4);
    }

    SECTION("draws to the active layer and clears the foreground layer when pointerUp")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        LineTool lineTool;

        TileLayer &activeLayer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();
        TileLayer &foregroundLayer = documentStore.getActiveDocument().getActiveDrawing().getForegroundLayer();

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(0, 0));
        toolContext.pointer.down = toolContext.pointer.curr;

        lineTool.execPointerDown(toolContext);

        toolContext.pointer.isDown = true;

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(4, 4));

        lineTool.execPointerMove(toolContext);

        toolContext.pointer.curr = activeLayer.getWorldPos(Vec2Int(4, 0));

        lineTool.execPointerMove(toolContext);
        lineTool.execPointerUp(toolContext);

        REQUIRE(activeLayer.getRenderables().size() == 4);
        REQUIRE(foregroundLayer.getRenderables().size() == 0);
    }
}
