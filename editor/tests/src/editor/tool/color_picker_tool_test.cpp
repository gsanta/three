#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/color_picker_tool.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/app/tool/brush_tool.h"
#include "./layer_provider_test_impl.h"
#include "../test_event_emitter.h"
#include "../test_helpers/test_document_factory.h"

using namespace ::spright::editor;

TEST_CASE("ColorPickerTool pointerDown", "[color-picker-tool]") {
	SECTION("picks the color at the given pointer position") {
		TileLayer tileLayer = TestDocumentFactory::createTileLayer(0);
		TileLayer tempLayer = TestDocumentFactory::createTileLayer(0);

		TestEventEmitter eventEmitter;

		ToolHandler toolHandler;

		// TODO: destroy layerprovider
		ColorPickerTool colorPickerTool(new LayerProviderTestImpl(tileLayer, tempLayer), &toolHandler, &eventEmitter);

		Brush brush;
		brush.paint(&tileLayer, Vec2Int(0, 0), 0xFFFF0000);
		brush.paint(&tileLayer, Vec2Int(1, 1), 0xFF00FF00);

		PointerInfo pointerInfo;
		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(0, 0));
		colorPickerTool.pointerDown(pointerInfo);

		REQUIRE(colorPickerTool.getPickedColor() == 0xFFFF0000);

		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(1, 1));
		colorPickerTool.pointerDown(pointerInfo);

		REQUIRE(colorPickerTool.getPickedColor() == 0xFF00FF00);
	}

	SECTION("emits event if picked color changes") {
		TileLayer tileLayer = TestDocumentFactory::createTileLayer(0);
		TileLayer tempLayer = TestDocumentFactory::createTileLayer(0);

		TestEventEmitter eventEmitter;

		ToolHandler toolHandler;

		LayerProviderTestImpl layerProvider(tileLayer, tempLayer);

		ColorPickerTool colorPickerTool(&layerProvider, &toolHandler, &eventEmitter);

		Brush brush;
		brush.paint(&tileLayer, Vec2Int(0, 0), 0xFFFF0000);

		PointerInfo pointerInfo;

		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(1, 1));
		colorPickerTool.pointerDown(pointerInfo);
		// no tile at that position
		REQUIRE(eventEmitter.getEmitCount() == 0);

		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(0, 0));
		colorPickerTool.pointerDown(pointerInfo);

		REQUIRE(eventEmitter.getLastEventType() == "tool_data_changed");
		REQUIRE(eventEmitter.getLastData()["tool"] == "color_picker");
		REQUIRE(eventEmitter.getEmitCount() == 1);

		colorPickerTool.pointerDown(pointerInfo);
		// picking the already picked color
		REQUIRE(eventEmitter.getEmitCount() == 1);
	}
}
