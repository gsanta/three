#include "../../../editor/test_helpers/builders/tile_layer_builder.h"
#include "../src/engine/graphics/camera/camera.h"
#include "../src/engine/graphics/colors.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/layer/tile_layer.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/structure/canvas.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::engine;

SCENARIO("TileLayer")
{
    GIVEN("a tile layer")
    {
        WHEN("copying it")
        {
            THEN("the copy equals to the original")
            {
                Rect2D rect(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
                Bounds bounds = Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f);
                TileLayer layer1("layer", Group<Rect2D>(), bounds);

                layer1.add(rect);

                TileLayer layer2("layer2", Group<Rect2D>(), Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

                layer2 = layer1;

                REQUIRE(layer2.getTiles().size() == 1);
                REQUIRE(layer2.getBounds() == bounds);
            }
        }

        WHEN("comparing it with another tile layer with the same properties")
        {
            THEN("the two equals")
            {
                TileLayer layer1("layer", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));
                TileLayer layer2("layer", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));

                Rect2D rect1(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF);
                Rect2D rect2(-2.0f, -3.0f, 3.0f, 5.0f, 0xFF0000FF);

                layer1.add(rect1);
                layer1.add(rect2);
                layer2.add(rect1);
                layer2.add(rect2);

                REQUIRE(layer1 == layer2);
            }
        }

        WHEN("comparing it with another tile layer with different properties")
        {
            THEN("the two do not equal")
            {
                TileLayer layer1("layer", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));
                TileLayer layer2("layer_2", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));
                TileLayer layer3("layer_3", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));
                TileLayer layer4("layer_4", Group<Rect2D>(), Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));
                TileLayer layer5("layer_5", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));
                layer5.add(Rect2D(2.0f, 3.0f, 3.0f, 5.0f, 0xFF0000FF));

                REQUIRE(layer1 != layer2);
                REQUIRE(layer1 != layer3);
                REQUIRE(layer1 != layer4);
                REQUIRE(layer1 != layer5);
            }
        }

        WHEN("adding a tile to the tile layer")
        {
            THEN("it will contain the new tile")
            {
                TileLayer layer("layer", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));

                REQUIRE(layer.getTiles().size() == 0);

                layer.add(Rect2D(0, 0, 1, 1, 0x00000000));

                REQUIRE(layer.getTiles().size() == 1);

                layer.add(Rect2D(2, 2, 1, 1, 0x00000000));

                REQUIRE(layer.getTiles().size() == 2);

                Vec2Int pos = layer.getTilePos(Vec2(0.5f, 0.5f));
            }
        }

        WHEN("getting a tile's position")
        {
            THEN("it indexes the tiles from the bottom left to top right direction")
            {

                TileLayer layer("layer", Group<Rect2D>(), Bounds::createWithPositions(-16.0f, -16.0f, 16.0f, 16.0f));

                float tileSize = layer.getTileSize();

                REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).x == 0);
                REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f)).y == 0);
                REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).x == 1);
                REQUIRE(layer.getTilePos(Vec2(-16.0f + tileSize, -16.0f)).y == 0);
                REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).x == 0);
                REQUIRE(layer.getTilePos(Vec2(-16.0f, -16.0f + tileSize)).y == 1);
            }
        }
    }
}
