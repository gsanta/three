#include <catch2/catch_test_macros.hpp>
#include "../../test_helpers/test_document_factory.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/maths/vec2.h"
#include "../src/app/tool/common/selection_box.h"
#include "../src/app/tool/color_picker_tool.h"

using namespace ::spright::editor;
using namespace ::spright::engine;

TEST_CASE("SelectionBox", "[selection-box]") {
	SECTION("can determine if a coordinate is inside of the selection") {
		TileLayer tileLayer = TestDocumentFactory::createTileLayers(1)[0];

		SelectionBox selectionBox;
		selectionBox.setTileLayer(tileLayer);

		selectionBox.start(Vec2(0, 0));
		selectionBox.setPosition(Vec2(1, 1));
	
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.1f, 0.1f)) == true);
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.9f, 0.1f)) == true);
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.9f, 0.9f)) == true);
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.1f, 0.9f)) == true);

		REQUIRE(selectionBox.isInsideSelection(Vec2(-0.1f, 0.1f)) == false);
		REQUIRE(selectionBox.isInsideSelection(Vec2(1.1f, 0.1f)) == false);
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.9f, -0.1f)) == false);
		REQUIRE(selectionBox.isInsideSelection(Vec2(0.1f, 1.1f)) == false);
	}
}
