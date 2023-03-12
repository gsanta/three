#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/eraser_tool/eraser_tool.h"
#include "../src/app/document/document_handler.h"
#include "../src/app/document/document_store.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "../src/app/tool/brush_tool.h"
#include "../layer_provider_test_impl.h"
#include "../../test_helpers/test_document_factory.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("EraseTool pointerDown", "[erase-tool]") {
	SECTION("removes the tiles at the given pointer position") {
		TileLayer eraseLayer = TestDocumentFactory::createTileLayer(0);
		TileLayer drawLayer = TestDocumentFactory::createTileLayer(0);

		Brush brush;
		brush.paint(eraseLayer, Vec2Int(0, 0), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(1, 0), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(2, 0), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(0, 1), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(1, 1), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(2, 1), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(0, 2), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(1, 2), 0xFFFFFFFF);
		brush.paint(eraseLayer, Vec2Int(2, 2), 0xFFFFFFFF);

		Rect2D* renderable = eraseLayer.getAtTileIndex(0);

		EraserTool eraseTool(new LayerProviderTestImpl(eraseLayer, drawLayer), 1);

		PointerInfo pointerInfo;
		pointerInfo.curr = eraseLayer.getWorldPos(Vec2Int(1, 1));

		eraseTool.pointerDown(pointerInfo);

		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(0, 0)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(1, 0)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(2, 0)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(0, 1)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(1, 1)) == nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(2, 1)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(0, 2)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(1, 2)) != nullptr);
		REQUIRE(eraseLayer.getAtTilePos(Vec2Int(2, 2)) != nullptr);
	}
}