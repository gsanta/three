#include "../../../../test_helpers/builders/document_builder.h"
#include "../../../../test_helpers/builders/drawing_builder.h"
#include "../../../../test_helpers/builders/tool_context_builder.h"
#include "../../../../test_helpers/common_tool_funcs.h"
#include "../../../../test_helpers/test_event_emitter.h"
#include "../src/editing/tool/tools/color_picker_tool/color_picker_tool.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;

SCENARIO("Color picker tool")
{
    GIVEN("a canvas with pixels")
    {
        Document document =
            DocumentBuilder()
                .withDrawing(DrawingBuilder().withTileLayer(
                    TileLayerBuilder().withTile(Vec2Int(0, 0), COLOR_BLUE).withTile(Vec2Int(1, 0), COLOR_RED)))
                .build();

        TestEventEmitter eventEmitter;

        ToolContext toolContext = ToolContextBuilder().build(document);
        CommonToolFuncs commonToolFuncs(document, toolContext);

        ColorPickerTool colorPickerTool(&eventEmitter);

        THEN("initial color is black")
        {
            REQUIRE(colorPickerTool.getColor() == COLOR_BLACK);
        }

        WHEN("picking a color at a given position")
        {
            commonToolFuncs.setCurr(Vec2Int(1, 0));
            colorPickerTool.pointerDown(toolContext);

            THEN("it picks the color")
            {
                REQUIRE(colorPickerTool.getColor() == COLOR_RED);
            }

            THEN("it emits 'tool_data_changed' event")
            {
                REQUIRE(eventEmitter.getLastEventType() == "tool_data_changed");
                REQUIRE(eventEmitter.getLastData()["tool"] == "color_picker");
                REQUIRE(eventEmitter.getEmitCount() == 1);
            }

            WHEN("picking a color at an other position")
            {
                commonToolFuncs.setCurr(Vec2Int(0, 0));
                colorPickerTool.pointerDown(toolContext);
                THEN("it picks the other color")
                {
                    REQUIRE(colorPickerTool.getColor() == COLOR_BLUE);
                }
            }
        }
    }
}
