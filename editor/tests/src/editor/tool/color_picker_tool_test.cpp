// #include "../src/app/tool/tools/brush_tool/brush_tool.h"
// #include "../src/app/tool/tools/color_picker_tool/color_picker_tool.h"
// #include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
// #include "../test_helpers/document_info_builder.h"
// #include "../test_helpers/document_store_builder.h"
// #include "../test_helpers/pointer_info_builder.h"
// #include "../test_helpers/test_document_factory.h"
// #include "../test_helpers/test_event_emitter.h"
// #include "../test_helpers/tool_context_builder.h"

// #include <catch2/catch_test_macros.hpp>

// using namespace ::spright::editor;

// TEST_CASE("ColorPickerTool pointerDown", "[color-picker-tool]")
// {
//     SECTION("picks the color at the given pointer position")
//     {
//         TestEventEmitter eventEmitter;

//         ToolHandler toolHandler;

//         DocumentStore documentStore = DocumentStoreBuilder().withDrawing().build();
//         Drawing &activeDrawing = documentStore.getActiveDocument().getActiveDrawing();
//         TileLayer &tileLayer = activeDrawing.getActiveLayer();

//         ToolContext toolContext =
//             ToolContextBuilder()
//                 .withPointerInfo(PointerInfoBuilder().withCurr(tileLayer.getCenterPos(Vec2Int(0, 0))))
//                 .withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(&activeDrawing))
//                 .build();

//         // TODO: destroy layerprovider
//         ColorPickerTool colorPickerTool(&toolHandler, &eventEmitter);

//         Brush brush;
//         brush.paint(tileLayer, Vec2Int(0, 0), 0xFFFF0000);
//         brush.paint(tileLayer, Vec2Int(1, 1), 0xFF00FF00);

//         colorPickerTool.pointerDown(toolContext);

//         REQUIRE(colorPickerTool.getPickedColor() == 0xFFFF0000);

//         toolContext.pointer.curr = tileLayer.getCenterPos(Vec2Int(1, 1));
//         colorPickerTool.pointerDown(toolContext);

//         REQUIRE(colorPickerTool.getPickedColor() == 0xFF00FF00);
//     }

//     SECTION("emits event if picked color changes")
//     {
//         DocumentStore documentStore = DocumentStoreBuilder().withDrawing().build();

//         TestEventEmitter eventEmitter;

//         ToolHandler toolHandler;


//         ColorPickerTool colorPickerTool(&toolHandler, &eventEmitter);

//         Drawing &activeDrawing = documentStore.getActiveDocument().getActiveDrawing();
//         TileLayer &tileLayer = activeDrawing.getActiveLayer();

//         ToolContext toolContext =
//             ToolContextBuilder()
//                 .withPointerInfo(PointerInfoBuilder().withCurr(tileLayer.getCenterPos(Vec2Int(1, 1))))
//                 .withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(&activeDrawing))
//                 .build();

//         Brush brush;

//         brush.paint(tileLayer, Vec2Int(0, 0), 0xFFFF0000);

//         colorPickerTool.pointerDown(toolContext);
//         // no tile at that position
//         REQUIRE(eventEmitter.getEmitCount() == 0);

//         toolContext.pointer.curr = tileLayer.getCenterPos(Vec2Int(0, 0));
//         colorPickerTool.pointerDown(toolContext);

//         REQUIRE(eventEmitter.getLastEventType() == "tool_data_changed");
//         REQUIRE(eventEmitter.getLastData()["tool"] == "color_picker");
//         REQUIRE(eventEmitter.getEmitCount() == 1);

//         colorPickerTool.pointerDown(toolContext);
//         // picking the already picked color
//         REQUIRE(eventEmitter.getEmitCount() == 1);
//     }
// }
