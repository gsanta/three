#include "../src/app/document/checkerboard.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../test_helpers/test_document_factory.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("Checkerboard", "[checkerboard]")
{
    SECTION("can create a checkerboard for a tile layer")
    {

        TileLayer layer = TestDocumentFactory::createTileLayer(0, 2.0f, Bounds(2.0f, 1.0f, 7.0f, 6.0f));
        Checkerboard checkerBoard;

        checkerBoard.create(layer);

        REQUIRE(layer.getAtTilePos(0, 0)->getSize().x == Catch::Approx(2));
        REQUIRE(layer.getAtTilePos(1, 0)->getSize().x == Catch::Approx(2));
        REQUIRE(layer.getAtTilePos(2, 0)->getSize().x == Catch::Approx(1));

        REQUIRE(layer.getAtTilePos(0, 0)->getSize().y == Catch::Approx(2));
        REQUIRE(layer.getAtTilePos(0, 1)->getSize().y == Catch::Approx(2));
        REQUIRE(layer.getAtTilePos(0, 2)->getSize().y == Catch::Approx(1));
    }
}
