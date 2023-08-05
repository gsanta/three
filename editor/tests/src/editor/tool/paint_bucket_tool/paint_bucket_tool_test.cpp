
#include "../src/app/core/colors.h"
#include "../src/app/tool/paint_bucket/paint_bucket_tool.h"
#include "src/editor/test_helpers/document_builder.h"
#include "src/editor/test_helpers/document_store_builder.h"
#include "src/editor/test_helpers/tool_context_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

TEST_CASE("PaintBucketTool", "[paint-bucket-tool]")
{
    SECTION("can fill an empty layer")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 2, 2))).build();
        ToolContext toolContext = ToolContextBuilder().withDocument(document).build();

        PaintBucketTool paintBucketTool;

        paintBucketTool.execPointerUp(toolContext);

        TileLayer &layer = document.getActiveLayer();

        REQUIRE(layer.getRenderables().size() == 4);
        REQUIRE(layer.getRenderables()[0]->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getRenderables()[1]->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getRenderables()[2]->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getRenderables()[3]->getColor() == COLOR_SPRIGHT_ORANGE);
    }

    SECTION("can fill a continuous area")
    {
        DocumentStore documentStore = DocumentStoreBuilder()
                                          .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                          .withTile(Vec2Int(0, 1))
                                                                                          .withTile(Vec2Int(0, 2))
                                                                                          .withTile(Vec2Int(0, 3))
                                                                                          .withTile(Vec2Int(1, 3))
                                                                                          .withTile(Vec2Int(2, 3))
                                                                                          .withTile(Vec2Int(3, 3))
                                                                                          .withTile(Vec2Int(3, 2))
                                                                                          .withTile(Vec2Int(3, 1))
                                                                                          .withTile(Vec2Int(3, 0))
                                                                                          .withTile(Vec2Int(2, 0))
                                                                                          .withTile(Vec2Int(1, 0))
                                                                                          .withTile(Vec2Int(0, 0))))
                                          .build();
        ToolContext toolContext = ToolContextBuilder().withActiveDrawing(documentStore).build();

        TileLayer &layer = documentStore.getActiveDocument().getActiveLayer();

        PaintBucketTool paintBucketTool;

        toolContext.pointer.curr = layer.getWorldPos(1, 1);

        paintBucketTool.execPointerUp(toolContext);

        REQUIRE(layer.getAtTilePos(1, 1)->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtTilePos(1, 2)->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtTilePos(2, 1)->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtTilePos(2, 2)->getColor() == COLOR_SPRIGHT_ORANGE);
        REQUIRE(layer.getAtTilePos(4, 2) == nullptr);
    }
}
