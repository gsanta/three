#include "../src/editing/algorithms/flip_vertical.h"
#include "../test_helpers/builders/document_store_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;
using namespace spright::engine;

TEST_CASE("flip_vertical", "[flip-vertical]")
{
    SECTION("can flip a layer vertically")
    {
        DocumentStore documentStore = DocumentStoreBuilder()
                                          .withDocumentBounds(Bounds(0, 0, 6, 6))
                                          .withDrawing(DrawingBuilder()
                                                           .withBounds(Bounds(-3.0f, -3.0f, 3.0f, 3.0f))
                                                           .withTileSize(1.0f)
                                                           .withTileLayer(TileLayerBuilder()
                                                                              .withTileSize(1.0f)
                                                                              .withTile(Vec2Int(0, 5))
                                                                              .withTile(Vec2Int(1, 5))
                                                                              .withTile(Vec2Int(0, 4))))
                                          .build();

        TileLayer &layer = documentStore.getActiveDocument().getActiveDrawing()->getActiveLayer();

        Drawing *drawing = documentStore.getActiveDocument().getActiveDrawing();
        flip_vertical(drawing->getActiveLayer());

        REQUIRE(layer.getAtTilePos(0, 5) == nullptr);
        REQUIRE(layer.getAtTilePos(1, 5) == nullptr);
        REQUIRE(layer.getAtTilePos(0, 4) == nullptr);
        REQUIRE(layer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(1, 0) != nullptr);
        REQUIRE(layer.getAtTilePos(0, 1) != nullptr);
    }
}
