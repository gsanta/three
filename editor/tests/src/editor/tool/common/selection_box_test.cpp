#include "../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../../test_helpers/test_document_factory.h"
#include "../src/app/tool/color_picker_tool.h"
#include "../src/app/tool/common/selection_box.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::editor;
using namespace ::spright::engine;

TEST_CASE("SelectionBox", "[selection-box]")
{
    SECTION("can create a selection box around the selected area")
    {
        TileLayer tileLayer = TestDocumentFactory::createTileLayers(1)[0];

        SelectionBox selectionBox(&tileLayer);

        selectionBox.setSelectionStart(Vec2(0, 0));
        selectionBox.setSelectionEnd(Vec2(2, 2));

        REQUIRE_THAT(tileLayer.getTiles()[0]->getBounds(), EqualsBounds(Bounds(0, 0, 2, 0.1)));
        REQUIRE_THAT(tileLayer.getTiles()[1]->getBounds(), EqualsBounds(Bounds(0, 2, 2, 2.1)));
        REQUIRE_THAT(tileLayer.getTiles()[2]->getBounds(), EqualsBounds(Bounds(0, 0, 0.1, 2)));
        REQUIRE_THAT(tileLayer.getTiles()[3]->getBounds(), EqualsBounds(Bounds(2, 0, 2.1, 2)));
    }

    SECTION("can move a selection box")
    {
        TileLayer tileLayer = TestDocumentFactory::createTileLayers(1)[0];

        SelectionBox selectionBox(&tileLayer);

        selectionBox.setSelectionStart(Vec2(0, 0));
        selectionBox.setSelectionEnd(Vec2(2, 2));
        selectionBox.setMoveStart(Vec2(0, 0));
        selectionBox.setMoveEnd(Vec2(1.1f, 1.1f));

        REQUIRE_THAT(tileLayer.getTiles()[0]->getBounds(),
                     EqualsBounds(Bounds::createWithPositions(1.0f, 1.0f, 3.0f, 1.1f)));
        REQUIRE_THAT(tileLayer.getTiles()[1]->getBounds(),
                     EqualsBounds(Bounds::createWithPositions(1.0f, 3.0f, 3.0f, 3.1f)));
        REQUIRE_THAT(tileLayer.getTiles()[2]->getBounds(),
                     EqualsBounds(Bounds::createWithPositions(1.0f, 1.0f, 1.1f, 3.0f)));
        REQUIRE_THAT(tileLayer.getTiles()[3]->getBounds(),
                     EqualsBounds(Bounds::createWithPositions(3.0f, 1.0f, 3.1f, 3.0f)));
    }

    SECTION("can determine if a coordinate is inside of the selection")
    {
        TileLayer tileLayer = TestDocumentFactory::createTileLayers(1)[0];

        SelectionBox selectionBox(&tileLayer);

        selectionBox.setSelectionStart(Vec2(0, 0));
        selectionBox.setSelectionEnd(Vec2(1, 1));

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
