#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/erase_tool/erase_tool.cpp"
#include "../src/app/document/document_handler.h"
#include "../src/app/document/document_store.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "../src/app/tool/brush_tool.h"
#include "../layer_provider_test_impl.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("EraseTool erase", "[erase-tool]") {
	SECTION("can add a renderable to the layer") {
		Container container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()), &container);
		TileLayer tempLayer("layer", "id", new Group<Rect2D>(new HeadlessRenderer2D()) , &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(0, 0), 0xFFFFFFFF);

		Renderable2D* renderable = layer.getAtTileIndex(0);

		EraseTool eraseTool(new LayerProviderTestImpl(layer, tempLayer));
	}
}