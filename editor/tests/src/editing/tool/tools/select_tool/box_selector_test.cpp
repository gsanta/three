#include "../../../../test_helpers/builders/document_store_builder.h"
#include "../../../../test_helpers/builders/tile_layer_builder.h"
#include "../../../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../src/editing/tool/tools/color_picker_tool/color_picker_tool.h"
#include "../src/editing/tool/tools/select_tool/box_selector.h"
#include "../src/editing/utils/conversions.h"
#include "../src/engine/scene/containers/tile_layer.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;
using namespace ::spright::engine;

SCENARIO("Box selector")
{

    GIVEN("A box selector")
    {
        std::shared_ptr<DocumentStore> documentStore = std::make_shared<DocumentStore>(
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withTileLayer(
                    TileLayerBuilder().withBounds(BoundsInt(-5, -5, 5, 5)).withTileFill()))
                .build());

        SelectionBuffer selectionBuffer;

        BoxSelector boxSelector(selectionBuffer);

        TileLayer &toolLayer = get_active_tile_canvas(documentStore->getActiveDocument()).getToolLayer();
        TileLayer &activeLayer = get_active_tile_canvas(documentStore->getActiveDocument()).getActiveLayer();

        WHEN("making a selection")
        {
            boxSelector.select(activeLayer, toolLayer, Vec2(2, 2), Vec2(1, 1));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer.getTileIndexes().size() == 4);

                float tileIndex = toolLayer.getTileIndex(1, 1);

                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from top to bottom")
        {
            boxSelector.select(activeLayer, toolLayer, Vec2(1, 1), Vec2(2, 2));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer.getTileIndexes().size() == 4);

                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from right to left")
        {
            boxSelector.select(activeLayer, toolLayer, Vec2(2, 1), Vec2(1, 2));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer.getTileIndexes().size() == 4);

                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(1, 2))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(2, 2))));
            }
        }

        WHEN("making a selection from negative range to positive")
        {
            boxSelector.select(activeLayer, toolLayer, Vec2(0.5f, 1.5f), Vec2(-0.9f, -0.9f));

            THEN("it fills the selection buffer with the selected tiles")
            {
                REQUIRE(selectionBuffer.getTileIndexes().size() == 6);

                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(-1, -1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(0, -1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(-1, 0))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(0, 0))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(-1, 1))));
                REQUIRE(selectionBuffer.containsIndex(toolLayer.getTileIndex(Vec2(0, 1))));
            }
        }
    }
}
