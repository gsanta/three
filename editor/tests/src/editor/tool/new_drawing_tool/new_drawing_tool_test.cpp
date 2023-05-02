#include "../../test_helpers/document_info_builder.h"
#include "../../test_helpers/document_store_builder.h"
#include "../../test_helpers/pointer_info_builder.h"
#include "../../test_helpers/tool_context_builder.h"
#include "../src/app/tool/new_drawing_tool/new_drawing_tool.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::editor;

TEST_CASE("NewDrawingTool", "[new-drawing-tool]")
{
    SECTION("can create a new drawing with selection")
    {
        Container windowContainer(Bounds(0, 0, 500, 500));

        DocumentStore documentStore = DocumentStoreBuilder().build();
        DocumentFactory documentFactory = TestDocumentFactory::createDocumentFactory(windowContainer);

        Drawing &canvas = documentStore.getActiveDocument().getCanvas();
        Drawing &activeDrawing = documentStore.getActiveDocument().getDrawings()[0];

        ToolContext toolContext =
            ToolContextBuilder()
                .withPointerInfo(PointerInfoBuilder().withCurr(canvas.getForegroundLayer().getWorldPos(Vec2Int(1, 1))))
                .withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(&activeDrawing))
                .build();

        NewDrawingTool newDrawingTool(&documentStore, &documentFactory);

        newDrawingTool.pointerDown(toolContext);

        toolContext.pointer.prev = toolContext.pointer.curr;
        toolContext.pointer.curr = canvas.getForegroundLayer().getWorldPos(Vec2Int(3, 3));
        newDrawingTool.pointerMove(toolContext);
        newDrawingTool.pointerUp(toolContext);

        REQUIRE(documentStore.getActiveDocument().getDrawings().size() == 2);
    }
}
