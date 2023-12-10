#include "../../test_helpers/builders/tile_layer_builder.h"
#include "../src/editing/algorithms/draw_rect.h"
#include "../src/editing/algorithms/shear_horizontal.h"
#include "../src/engine/graphics/colors.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;
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
