#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/color_picker_tool.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/app/tool/brush_tool.h"
#include "./layer_provider_test_impl.h"
#include "../src/app/service/core/event/event_handler.h"
#include "../test_event_listener.h"

using namespace ::spright::editor;

TEST_CASE("ColorPickerTool pointerDown", "[color-picker-tool]") {
	SECTION("picks the color at the given pointer position") {
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer tileLayer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer tempLayer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		EventHandler eventHandler;

		// TODO: destroy layerprovider
		ColorPickerTool colorPickerTool(new LayerProviderTestImpl(tileLayer, tempLayer), &eventHandler);

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
		Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

		TileLayer tileLayer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);
		TileLayer tempLayer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		EventHandler eventHandler;
		TestEventListener eventListener;
		eventHandler.addListener(&eventListener);

		LayerProviderTestImpl layerProvider(tileLayer, tempLayer);

		ColorPickerTool colorPickerTool(&layerProvider, &eventHandler);

		Brush brush;
		brush.paint(&tileLayer, Vec2Int(0, 0), 0xFFFF0000);

		PointerInfo pointerInfo;

		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(1, 1));
		colorPickerTool.pointerDown(pointerInfo);
		// no tile at that position
		REQUIRE(eventListener.getEmitCount() == 0);

		pointerInfo.curr = tileLayer.getWorldPos(Vec2Int(0, 0));
		colorPickerTool.pointerDown(pointerInfo);

		REQUIRE(eventListener.getLastData()["tool"] == colorPickerTool.getName());
		REQUIRE(eventListener.getLastData()["event_type"] == "tool_data_changed");
		REQUIRE(eventListener.getLastData()["changes"][0]["color"] == 0xFFFF0000);
		REQUIRE(eventListener.getEmitCount() == 1);

		colorPickerTool.pointerDown(pointerInfo);
		// picking the already picked color
		REQUIRE(eventListener.getEmitCount() == 1);
	}
}
