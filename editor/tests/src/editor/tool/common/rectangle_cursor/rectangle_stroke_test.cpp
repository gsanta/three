#include "../../../test_helpers/test_document_factory.h"
#include "../src/app/tool/common/rectangle_cursor/rectangle_stroke.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>
#include <vector>

using namespace spright::editor;
using namespace spright::maths;

TEST_CASE("Rectangle stroke draw", "[rectangle-stroke]")
{
    SECTION("creates the rectangular stroke, rectangle size is even, rectangle position is at the origin")
    {
        int rectangleSize = 4;
        float tileSize = 0.5f;

        TileLayer drawLayer =
            TestDocumentFactory::createTileLayer(0, tileSize, Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

        RectangleStroke rectangleStroke(rectangleSize);

        rectangleStroke.draw(drawLayer, Vec2(0, 0));

        std::vector<Rect2D *> &rects = drawLayer.getTiles();

        // Top line
        REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.0f));
        REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f));
        REQUIRE(rects[0]->getSize().x == Catch::Approx(2.0f));
        REQUIRE(rects[0]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Bottom line
        REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.0f));
        REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-1.0f));
        REQUIRE(rects[2]->getSize().x == Catch::Approx(2.0f));
        REQUIRE(rects[2]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Right line
        REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f));
        REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.0f));
        REQUIRE(rects[1]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[1]->getSize().y == Catch::Approx(2.0f));

        // Left line
        REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-1.0f));
        REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.0f));
        REQUIRE(rects[3]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[3]->getSize().y == Catch::Approx(2.0f));
    }

    SECTION("creates the rectangular stroke, rectangle size is odd, rectangle position is at the origin")
    {
        int rectangleSize = 3;
        float tileSize = 0.5f;

        TileLayer drawLayer =
            TestDocumentFactory::createTileLayer(0, tileSize, Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

        RectangleStroke rectangleStroke(rectangleSize);

        rectangleStroke.draw(drawLayer, Vec2(0, 0));

        std::vector<Rect2D *> &rects = drawLayer.getTiles();

        // Top line
        REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.25f));
        REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f));
        REQUIRE(rects[0]->getSize().x == Catch::Approx(1.5f));
        REQUIRE(rects[0]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Bottom line
        REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.25f));
        REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-0.5f));
        REQUIRE(rects[2]->getSize().x == Catch::Approx(1.5f));
        REQUIRE(rects[2]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Right line
        REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f));
        REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.25f));
        REQUIRE(rects[1]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[1]->getSize().y == Catch::Approx(1.5f));

        // Left line
        REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-0.5f));
        REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.25f));
        REQUIRE(rects[3]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[3]->getSize().y == Catch::Approx(1.5f));
    }

    SECTION("creates the rectangular stroke when the rectangle is not at the origin")
    {
        int rectangleSize = 4;
        float tileSize = 0.5f;
        float translateX = 2.0f;
        float translateY = 3.0f;

        Container container(Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

        TileLayer drawLayer =
            TestDocumentFactory::createTileLayer(0, tileSize, Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

        RectangleStroke rectangleStroke(rectangleSize);

        rectangleStroke.draw(drawLayer, Vec2(translateX, translateY));

        std::vector<Rect2D *> &rects = drawLayer.getTiles();

        // Top line
        REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.0f + translateX));
        REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f + translateY));
        REQUIRE(rects[0]->getSize().x == Catch::Approx(2.0f));
        REQUIRE(rects[0]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Bottom line
        REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.0f + translateX));
        REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-1.0f + translateY));
        REQUIRE(rects[2]->getSize().x == Catch::Approx(2.0f));
        REQUIRE(rects[2]->getSize().y == Catch::Approx(rectangleStroke.getStrokeWidth()));

        // Right line
        REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f + translateX));
        REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.0f + translateY));
        REQUIRE(rects[1]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[1]->getSize().y == Catch::Approx(2.0f));

        // Left line
        REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-1.0f + translateX));
        REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.0f + translateY));
        REQUIRE(rects[3]->getSize().x == Catch::Approx(rectangleStroke.getStrokeWidth()));
        REQUIRE(rects[3]->getSize().y == Catch::Approx(2.0f));
    }
}
