#include "../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../../test_helpers/test_document_factory.h"
#include "../../test_helpers/tile_layer_builder.h"
#include "../src/app/tool/color_picker_tool.h"
#include "../src/app/tool/select_tool/box_selector.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::editor;
using namespace ::spright::engine;

SCENARIO("Box selector")
{

    GIVEN("A box selector")
    {
        TileLayer tempLayer = TileLayerBuilder().withBounds(BoundsInt(-5, -5, 5, 5)).withTileFill().build();

        std::shared_ptr<SelectionBuffer> selectionBuffer = std::make_shared<SelectionBuffer>();

        BoxSelector boxSelector(selectionBuffer);


        WHEN("making a selection")
        {
            boxSelector.select(tempLayer, Vec2(3, 3), Vec2(2, 2), Vec2(1, 1));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer->getTileIndexes().size() == 4);

                float tileIndex = tempLayer.getTileIndex(1, 1);

                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from top to bottom")
        {
            boxSelector.select(tempLayer, Vec2(1, 1), Vec2(2, 2), Vec2(3, 3));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer->getTileIndexes().size() == 4);

                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from right to left")
        {
            boxSelector.select(tempLayer, Vec2(3, 1), Vec2(2, 2), Vec2(1, 3));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer->getTileIndexes().size() == 4);

                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from negative range to positive")
        {
            boxSelector.select(tempLayer, Vec2(1, 2), Vec2(0, 0), Vec2(-0.9f, -0.9f));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer->getTileIndexes().size() == 6);

                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(-1, -1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(0, -1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(-1, 0))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(0, 0))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(-1, 1))));
                REQUIRE(selectionBuffer->containsIndex(tempLayer.getTileIndex(Vec2(0, 1))));
            }
        }
    }
}