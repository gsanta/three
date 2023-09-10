#include "../src/app/tool/brush_tool.h"
#include "../test_helpers/document_builder.h"
#include "../test_helpers/tool_context_builder.h"

#include <catch2/catch_test_macros.hpp>


SCENARIO("Brush tool")
{

    GIVEN("an empty canvas")
    {
        Document document = DocumentBuilder().build();
        BrushTool brushTool;
        ToolContext toolContext = ToolContextBuilder().withDocument(document).build();

        WHEN("drawing a sequence of pixels without releasing the mouse")
        {

            TileLayer &layer = document.getActiveLayer();
            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(1, 1));
            toolContext.pointer.down = toolContext.pointer.curr;

            toolContext.pointer.buttons[0] = true;
            brushTool.execPointerDown(toolContext);
            brushTool.execPointerMove(toolContext);

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(2, 1));
            brushTool.execPointerMove(toolContext);

            toolContext.pointer.curr = layer.getCenterPos(Vec2Int(2, 2));
            brushTool.execPointerMove(toolContext);
            brushTool.execPointerUp(toolContext);

            WHEN("calling undo")
            {
                THEN("it removes all of the pixels")
                {

                    document.getHistory()->undo(document);

                    REQUIRE(layer.getTiles().size() == 0);

                    WHEN("calling redo")
                    {
                        THEN("it restores all of the pixels")
                        {
                            document.getHistory()->redo(document);

                            REQUIRE(layer.getTiles().size() == 3);
                            REQUIRE(layer.getAtTilePos(1, 1) != nullptr);
                            REQUIRE(layer.getAtTilePos(2, 1) != nullptr);
                            REQUIRE(layer.getAtTilePos(2, 2) != nullptr);
                        }
                    }
                }
            }
        }
    }
}
