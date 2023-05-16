#include "../../test_helpers/document_info_builder.h"
#include "../../test_helpers/document_store_builder.h"
#include "../../test_helpers/pointer_info_builder.h"
#include "../../test_helpers/tool_context_builder.h"
#include "../src/app/tool/select_tool/select_tool.h"

#include <catch2/catch_test_macros.hpp>


TEST_CASE("SelectTool", "[select-tool]")
{
    using namespace ::spright::engine;
    using namespace ::spright::editor;

    SECTION("sets the selection to the active drawing")
    {
        DocumentStore documentStore = DocumentStoreBuilder().build();
        Drawing &activeDrawing = documentStore.getActiveDocument().getDrawings()[0];

        ToolContext toolContext =
            ToolContextBuilder().withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(&activeDrawing)).build();

        SelectTool selectTool;

        selectTool.pointerDown(toolContext);

        toolContext.pointer.isDown = true;

        selectTool.pointerMove(toolContext);
        toolContext.pointer.prev = toolContext.pointer.curr;
        toolContext.pointer.curr = Vec2(2.0f, 2.0f);

        selectTool.pointerUp(toolContext);

        REQUIRE(activeDrawing.getState().getBounds() == Bounds(0, 0, 0, 0));
    }
}
