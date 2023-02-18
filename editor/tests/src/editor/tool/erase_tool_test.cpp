#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/erase_tool.cpp"
#include "../src/app/document/document_handler.h"
#include "../src/app/document/document_store.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "../src/app/tool/brush_tool.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("EraseTool erase", "[erase-tool]") {
	SECTION("can add a renderable to the layer") {

		HeadlessWindow window(500.0f, 500.0f);
		DocumentHandler documentHandler(&window);

		Camera* camera = new Camera(500, 500, Dimensions(-16, 16, -16, 16), 0, 1);
		Document document(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f), camera);

		TileLayer layer("layer", "id", &document, new HeadlessShader(), new HeadlessRenderer2D(), camera);
		Brush brush;

		brush.paint(&layer, Vec2Int(0, 0), 0xFFFFFFFF);

		Renderable2D* renderable = layer.getAtTileIndex(0);

		EventHandler eventHandler;
		DocumentStore documentStore;

		EraseTool eraseTool(&documentStore);
	}
}