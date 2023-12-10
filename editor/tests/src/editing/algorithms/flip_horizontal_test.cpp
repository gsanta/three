#include "../../test_helpers/builders/document_builder.h"
#include "../../test_helpers/builders/document_store_builder.h"
#include "../src/editing/algorithms/flip_horizontal.h"
#include "../src/editing/tool/tools/select_tool/selection_buffer.h"
#include "../src/editing/utils/conversions.h"
#include "../src/engine/graphics/colors.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;
using namespace spright::engine;

SelectionBuffer create_selection_buffer(const Vec2Int &bottomLeft, const Vec2Int &topRight, const TileLayer &layer)
{
    SelectionBuffer buffer;
    std::vector<int> indexes;

    for (int x = bottomLeft.x; x < topRight.x; x++)
    {
        for (int y = bottomLeft.y; y < topRight.y; y++)
        {
            indexes.push_back(layer.getTileIndex(x, y));
        }
    }

    buffer.setTileIndexes(indexes, layer);

    return buffer;
}

TEST_CASE("flip_horizontal", "[flip-horizontal]")
{
    SECTION("can flip a layer horizontally")
    {
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder()
                                                 .withBounds(Bounds(-3.0f, -3.0f, 3.0f, 3.0f))
                                                 .withTileSize(0.5f)
                                                 .withTileLayer(TileLayerBuilder()
                                                                    .withTile(Vec2Int(0, 1), COLOR_RED)
                                                                    .withTile(Vec2Int(1, 1), COLOR_RED)
                                                                    .withTile(Vec2Int(0, 2), COLOR_RED)
                                                                    .withTile(Vec2Int(11, 1), COLOR_BLUE)
                                                                    .withTile(Vec2Int(10, 1), COLOR_BLUE)
                                                                    .withTile(Vec2Int(11, 2), COLOR_BLUE)))
                                .build();

        TileLayer &layer = get_active_tile_canvas(document).getActiveLayer();

        int tileWidth = layer.getTileBounds().getWidth();
        int tileHeight = layer.getTileBounds().getHeight();

        TileCanvas &drawing = get_active_tile_canvas(document);
        flip_horizontal(drawing.getActiveLayer());

        REQUIRE(layer.getAtTilePos(tileWidth - 1, 1)->getColor() == COLOR_RED);
        REQUIRE(layer.getTileIndex(tileWidth - 1, 1) == 23);
        REQUIRE(layer.getAtTilePos(tileWidth - 2, 1)->getColor() == COLOR_RED);
        REQUIRE(layer.getTileIndex(tileWidth - 2, 1) == 22);
        REQUIRE(layer.getAtTilePos(tileWidth - 1, 2)->getColor() == COLOR_RED);
        REQUIRE(layer.getTileIndex(tileWidth - 1, 2) == 35);
        REQUIRE(layer.getAtTilePos(0, 1)->getColor() == COLOR_BLUE);
        REQUIRE(layer.getTileIndex(0, 1) == 12);
        REQUIRE(layer.getAtTilePos(1, 1)->getColor() == COLOR_BLUE);
        REQUIRE(layer.getTileIndex(1, 1) == 13);
        REQUIRE(layer.getAtTilePos(0, 2)->getColor() == COLOR_BLUE);
        REQUIRE(layer.getTileIndex(0, 2) == 24);
    }

    SECTION("can flip multiple layers")
    {
        DocumentStore documentStore =
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder()
                                 .withTileLayer(TileLayerBuilder().withTile(Vec2Int(0, 1), COLOR_RED))
                                 .withTileLayer(TileLayerBuilder().withTile(Vec2Int(0, 1), COLOR_BLUE))
                                 .withTileLayer(TileLayerBuilder().withTile(Vec2Int(1, 1), COLOR_YELLOW)))
                .build();

        TileLayer &layer = get_active_tile_canvas(documentStore.getActiveDocument()).getActiveLayer();

        int tileWidth = layer.getTileBounds().getWidth();

        TileCanvas &drawing = get_active_tile_canvas(documentStore.getActiveDocument());
        Frame &frame = drawing.getActiveFrame();

        flip_horizontal(drawing.getActiveFrame().getLayers());

        REQUIRE(frame.getLayer(0).getAtTilePos(tileWidth - 1, 1)->getColor() == COLOR_RED);
        REQUIRE(frame.getLayer(0).getAtTilePos(0, 1) == nullptr);
        REQUIRE(frame.getLayer(1).getAtTilePos(tileWidth - 1, 1)->getColor() == COLOR_BLUE);
        REQUIRE(frame.getLayer(1).getAtTilePos(0, 1) == nullptr);
        REQUIRE(frame.getLayer(2).getAtTilePos(tileWidth - 2, 1)->getColor() == COLOR_YELLOW);
        REQUIRE(frame.getLayer(2).getAtTilePos(1, 1) == nullptr);
    }

    SECTION("can flip a selected region")
    {
        DocumentStore documentStore =
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withTileSize(1).withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(0, 0))
                                                                                .withTile(Vec2Int(0, 1))
                                                                                .withTile(Vec2Int(1, 0))
                                                                                .withTile(Vec2Int(1, 1))))
                .build();

        TileCanvas &drawing = get_active_tile_canvas(documentStore.getActiveDocument());
        TileLayer &activeLayer = drawing.getActiveLayer();

        Frame &frame = drawing.getActiveFrame();

        SelectionBuffer buffer = create_selection_buffer(Vec2Int(1, 0), Vec2Int(3, 2), activeLayer);
        flip_horizontal(frame.getLayers(), buffer);

        REQUIRE(frame.getLayer(0).getAtTilePos(2, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(2, 1) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(1, 0) == nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(1, 1) == nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(0, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(0, 1) != nullptr);
    }

    SECTION("can flip a selected region, when selection is on the right side of the drawing")
    {
        DocumentStore documentStore =
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withTileSize(1).withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(3, 0))
                                                                                .withTile(Vec2Int(3, 1))
                                                                                .withTile(Vec2Int(5, 0))
                                                                                .withTile(Vec2Int(5, 1))))
                .build();

        TileCanvas &drawing = get_active_tile_canvas(documentStore.getActiveDocument());
        TileLayer &activeLayer = drawing.getActiveLayer();

        Frame &frame = drawing.getActiveFrame();

        SelectionBuffer buffer = create_selection_buffer(Vec2Int(1, 0), Vec2Int(5, 3), activeLayer);

        flip_horizontal(frame.getLayers(), buffer);

        REQUIRE(frame.getLayer(0).getAtTilePos(2, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(2, 1) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(3, 0) == nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(3, 1) == nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(5, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(5, 1) != nullptr);
    }

    SECTION("can flip a selected region, when selection tile width is odd")
    {
        DocumentStore documentStore =
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withTileSize(1).withTileLayer(TileLayerBuilder()
                                                                                .withTile(Vec2Int(2, 0))
                                                                                .withTile(Vec2Int(2, 1))
                                                                                .withTile(Vec2Int(3, 0))
                                                                                .withTile(Vec2Int(3, 1))))
                .build();

        TileCanvas &drawing = get_active_tile_canvas(documentStore.getActiveDocument());
        TileLayer &activeLayer = drawing.getActiveLayer();

        SelectionBuffer buffer = create_selection_buffer(Vec2Int(1, 0), Vec2Int(4, 2), activeLayer);

        Frame &frame = drawing.getActiveFrame();

        flip_horizontal(frame.getLayers(), buffer);

        REQUIRE(frame.getLayer(0).getAtTilePos(1, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(1, 1) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(2, 0) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(2, 1) != nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(3, 0) == nullptr);
        REQUIRE(frame.getLayer(0).getAtTilePos(3, 1) == nullptr);
    }
}
