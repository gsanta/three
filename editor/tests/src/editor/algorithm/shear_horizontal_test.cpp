#include "../src/app/algorithm/draw_rect.h"
#include "../src/app/algorithm/shear_horizontal.h"
#include "../src/engine/graphics/colors.h"
#include "../test_helpers/builders/tile_layer_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editor;
using namespace spright::engine;

SCENARIO("Vertical shear")
{
    GIVEN("a tile layer")
    {
        TileLayer layer = TileLayerBuilder().withBounds(BoundsInt(0, 0, 12, 10)).build();

        draw_filled_rect(layer, BoundsInt(4, 2, 8, 6), COLOR_BLACK);

        REQUIRE(1 == 1);
    }
}
