#include <catch2/catch_test_macros.hpp>
#include "../src/app/tool/erase_tool/eraser.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/app/tool/brush.h"

using namespace ::spright::editor;

TEST_CASE("Eraser erase", "[eraser]") {
	SECTION("can erase") {

		Container container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", new Group(new HeadlessRenderer2D()), &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(0, 0), 0xFFFFFFFF);

		REQUIRE(layer.getAtTileIndex(0) != nullptr);

		Eraser eraser;

		eraser.erase(layer, Vec2Int(0, 0), 1);

		REQUIRE(layer.getAtTileIndex(0) == nullptr);

		/*Container container(Dimensions(-16.0f, 16.0f, -16.0f, 16.0f));

		TileLayer layer("layer", "id", new Group(new HeadlessRenderer2D()), &container);
		TileLayer tempLayer("layer", "id", new Group(new HeadlessRenderer2D()), &container);

		Brush brush;
		brush.paint(&layer, Vec2Int(0, 0), 0xFFFFFFFF);

		Renderable2D* renderable = layer.getAtTileIndex(0);

		EraseTool eraseTool(new LayerProviderTestImpl(layer, tempLayer));*/
	}
}