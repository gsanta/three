
#include "../src/app/core/colors.h"
#include "../src/app/tool/rectangle_tool.h"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

TEST_CASE("RectangleTool", "[rectangle_tool]")
{
    using namespace ::spright::editor;

    SECTION("can draw a rectangle")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        RectangleTool rectTool;

        toolContext.pointer.curr = Vec2(1, 1);
        toolContext.pointer.prev = toolContext.pointer.curr;

        rectTool.pointerDown(toolContext);

        toolContext.pointer.down = toolContext.pointer.prev = toolContext.pointer.curr;
        toolContext.pointer.curr = Vec2(2, 3);
        toolContext.pointer.isDown = true;

        rectTool.pointerMove(toolContext);

        rectTool.pointerUp(toolContext);

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        REQUIRE(layer.getRenderables().size() == 8);

        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 1.1))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 1.1))->getSize().x == Catch::Approx(0.5f));
        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 1.1))->getSize().y == Catch::Approx(0.5f));
        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 1.6))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 2.1))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.1, 2.6))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.6, 1.1))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.6, 1.))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.6, 2.1))->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtWorldPos(Vec2(1.6, 2.6))->getColor() == COLOR_SPRIGHT_ORANGE);
    }
}