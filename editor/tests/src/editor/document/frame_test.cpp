#include "../src/app/document/frame.h"
#include "../test_helpers/test_document_factory.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>
#include <catch2/matchers/catch_matchers_contains.hpp>
#include <vector>

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("Frame", "[frame]")
{
    SECTION("can be copied")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect2(2.0f, 2.0f, 1.0f, 1.0f, 0xFF0000FF);

        layers[0].add(rect1);
        layers[1].add(rect2);

        Frame frame1;

        frame1.addLayer(layers[0]);
        frame1.addLayer(layers[1]);

        Frame frame2;
        frame2 = frame1;

        REQUIRE(frame1.getLayers().size() == frame2.getLayers().size());
        for (int i = 0; i < frame1.getLayers().size(); i++)
        {
            REQUIRE(frame1.getLayers()[i] == frame2.getLayers()[i]);
        }
    }

    SECTION("can be copy constructed")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect2(2.0f, 2.0f, 1.0f, 1.0f, 0xFF0000FF);

        layers[0].add(rect1);
        layers[1].add(rect2);

        Frame frame1;

        frame1.addLayer(layers[0]);
        frame1.addLayer(layers[1]);

        Frame frame2(frame1);

        REQUIRE(frame1.getLayers().size() == frame2.getLayers().size());
        for (int i = 0; i < frame1.getLayers().size(); i++)
        {
            REQUIRE(frame1.getLayers()[i] == frame2.getLayers()[i]);
        }
    }

    SECTION("can add a layer")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);
        frame.addLayer(layers[2]);

        REQUIRE(frame.getLayers().size() == 3);
    }

    SECTION("can remove a layer")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);
        frame.addLayer(layers[2]);

        frame.removeLayer(1);
        REQUIRE(frame.getLayers().size() == 2);
    }

    SECTION("can insert layer")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);
        frame.insertLayer(layers[2], 0);

        REQUIRE(frame.getLayer(0).getName() == "layer_2");
        REQUIRE(frame.getLayer(1).getName() == "layer_0");
        REQUIRE(frame.getLayer(2).getName() == "layer_1");
    }

    SECTION("can change a layer's order")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame;

        Rect2D rect1(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);
        Rect2D rect2(2.0f, 2.0f, 1.0f, 1.0f, 0xFF0000FF);

        layers[0].add(rect1);
        layers[0].add(rect2);

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        frame.changeLayerOrder(0, 1);

        REQUIRE(frame.getLayer(0).getName() == "layer_1");
        REQUIRE(frame.getLayer(1).getName() == "layer_0");
        REQUIRE(frame.getLayer(0).getTiles().size() == 0);
        REQUIRE(frame.getLayer(1).getTiles().size() == 2);

        frame.changeLayerOrder(1, 0);

        REQUIRE(frame.getLayer(0).getName() == "layer_0");
        REQUIRE(frame.getLayer(1).getName() == "layer_1");
        REQUIRE(frame.getLayer(0).getTiles().size() == 2);
        REQUIRE(frame.getLayer(1).getTiles().size() == 0);
    }

    SECTION("throws when change layer order is out of bounds")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        REQUIRE_THROWS_WITH(frame.changeLayerOrder(0, 2), "Layer order is out of bounds");
        REQUIRE_THROWS_WITH(frame.changeLayerOrder(2, 0), "Layer order is out of bounds");
    }

    SECTION("sets the layer index when adding a layer")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        REQUIRE(frame.getLayer(0).getIndex() == 0);
        REQUIRE(frame.getLayer(1).getIndex() == 1);
    }

    SECTION("can get a layer by it's index")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        REQUIRE(frame.getLayer(1).getName() == "layer_1");
    }


    SECTION("throws if layer with id is not found")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(2);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);

        REQUIRE_THROWS_WITH(frame.getLayer(2), "No layer at index 2");
    }

    SECTION("can get the json representation of the active layer")
    {
        std::vector<TileLayer> layers = TestDocumentFactory::createTileLayers(3);

        Frame frame;

        frame.addLayer(layers[0]);
        frame.addLayer(layers[1]);
        frame.addLayer(layers[2]);

        REQUIRE(frame.getJson().dump() == "{\"index\":0}");
    }
}
