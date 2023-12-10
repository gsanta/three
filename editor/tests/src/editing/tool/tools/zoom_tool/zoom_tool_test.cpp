#include "../../../../test_helpers/builders/document_builder.h"
#include "../../../../test_helpers/builders/drawing_builder.h"
#include "../../../../test_helpers/builders/tool_context_builder.h"
#include "../../../../test_helpers/common_tool_funcs.h"
#include "../src/editing/tool/tools/zoom_tool/zoom_tool.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;

SCENARIO("Zoom tool")
{
    GIVEN("a canvas")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withTileLayer()).build();

        ToolContext toolContext = ToolContextBuilder().build(document);
        CommonToolFuncs commonToolFuncs(document, toolContext);

        ZoomTool zoomTool;

        Camera *camera = document.getBackgroundCanvas().getCamera();

        WHEN("scrolling with the mouse in positive y dir")
        {
            commonToolFuncs.setScroll(Vec2(0, 1.0));
            zoomTool.scroll(toolContext);

            THEN("the canvas is zoomed in")
            {
                REQUIRE(camera->getZoom() == Catch::Approx(1 * 1.05));
            }

            WHEN("scrolling again")
            {
                zoomTool.scroll(toolContext);

                THEN("the canvas is zoomed in even more")
                {
                    REQUIRE(camera->getZoom() == Catch::Approx(1 * 1.05 * 1.05));
                }
            }
        }
    }
}
