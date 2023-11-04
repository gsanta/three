
#include "../../../test_helpers/builders/document_store_builder.h"
#include "../../../test_helpers/builders/drawing_builder.h"
#include "../../../test_helpers/builders/tool_context_builder.h"
#include "../../../test_helpers/common_tool_funcs.h"
#include "../../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../src/app/tool/tools/canvas_selection_tool/canvas_selection_tool.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::editor;
using namespace ::spright::engine;

SCENARIO("Tool handler")
{
    GIVEN("a document with drawings")
    {
        DocumentStore documentStore = DocumentStoreBuilder()
                                          .withDocumentBounds(Bounds(-10.0, -10.0, 10.0, 10.0))
                                          .withDrawing(DrawingBuilder().withBounds(Bounds(-3.0f, -3.0f, 3.0f, 3.0f)))
                                          .withDrawing(DrawingBuilder().withBounds(Bounds(5.0f, -2.0f, 7.0f, 4.0f)))
                                          .build();

        Document &document = documentStore.getActiveDocument();

        ToolContext toolContext = ToolContextBuilder().build(document);

        CommonToolFuncs commonToolFuncs(document, toolContext);

        HeadlessWindow window(4, 4);

        CanvasSelectionTool canvasSelectionTool;

        WHEN("pointer down on the first drawing")
        {
            commonToolFuncs.setPrevCurrDown(Vec2(0, 0));
            canvasSelectionTool.execPointerDown(toolContext);

            THEN("it sets it as the active drawing")
            {
                REQUIRE(document.getActiveDrawing() != nullptr);
                REQUIRE(document.getActiveDrawing() == &document.getDrawing(document.getCanvases()[0]->getUuid()));
            }

            WHEN("pointer down on the second drawing")
            {
                commonToolFuncs.setPrevCurrDown(Vec2(6.0, -1.0));
                canvasSelectionTool.execPointerDown(toolContext);

                THEN("it sets it as the active drawing")
                {
                    REQUIRE(document.getActiveDrawing() != nullptr);
                    REQUIRE(document.getActiveDrawing() == &document.getDrawing(document.getCanvases()[1]->getUuid()));
                }

                THEN("highlights the active drawing")
                {
                    Layer &decorationLayer =
                        document.getDrawing(document.getCanvases()[1]->getUuid()).getDecorationLayer();

                    REQUIRE(decorationLayer.getRenderables().size() == 4);
                    REQUIRE_THAT(decorationLayer.getRenderables()[0]->getBounds(),
                                 EqualsBounds(Bounds(5.0, 4.0, 7.0, 4.2))); // top
                    REQUIRE_THAT(decorationLayer.getRenderables()[1]->getBounds(),
                                 EqualsBounds(Bounds(7.0, -2.0, 7.2, 4.0))); // right
                    REQUIRE_THAT(decorationLayer.getRenderables()[2]->getBounds(),
                                 EqualsBounds(Bounds(5.0, -2.2, 7.0, -2.0))); // bottom
                    REQUIRE_THAT(decorationLayer.getRenderables()[3]->getBounds(),
                                 EqualsBounds(Bounds(4.8, -2.0, 5.0, 4.0))); // left
                }

                THEN("removes the highlight from the prev active layer")
                {
                    Layer &decorationLayer =
                        document.getDrawing(document.getCanvases()[0]->getUuid()).getDecorationLayer();
                    REQUIRE(decorationLayer.getRenderables().size() == 0);
                }
            }
        }
    }
}
