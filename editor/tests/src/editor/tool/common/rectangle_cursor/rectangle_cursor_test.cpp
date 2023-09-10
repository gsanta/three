#include "../../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../../../test_helpers/pointer_info_builder.h"
#include "../../../test_helpers/test_document_factory.h"
#include "../src/app/tool/common/rectangle_cursor/rectangle_cursor.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/maths/vec2.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>
#include <vector>

using namespace spright::editor;
using namespace spright::maths;

SCENARIO("Rectangle cursor")
{
    float tileSize = 1.0f;
    TileLayer tempLayer =
        TestDocumentFactory::createTileLayer(0, tileSize, Bounds::createWithPositions(-5.0f, -5.0f, 5.0f, 5.0f));

    GIVEN("a rectangle cursor with even size")
    {
        int rectangleSize = 4;

        RectangleCursor rectangleCursor(rectangleSize);

        WHEN("pointer position is at the origin")
        {
            PointerInfo pointer = PointerInfoBuilder().withCurr(Vec2(0, 0)).build();

            THEN("it sets the cursor to the correct position")
            {
                rectangleCursor.update(tempLayer, pointer);
                std::vector<Rect2D *> &rects = tempLayer.getTiles();

                REQUIRE_THAT(rects[0]->getBounds(), EqualsBounds(Bounds(-2.0f, -2.0f, 2.0f, 2.0f)));
            }
        }

        WHEN("pointer position is not at the origin")
        {
            PointerInfo pointer = PointerInfoBuilder().withCurr(Vec2(0, 0)).build();

            THEN("it sets the cursor to the correct position")
            {
                rectangleCursor.update(tempLayer, pointer);
                std::vector<Rect2D *> &rects = tempLayer.getTiles();

                REQUIRE_THAT(rects[0]->getBounds(), EqualsBounds(Bounds(-2.0f, -2.0f, 2.0f, 2.0f)));
            }
        }
    }

    GIVEN("a rectangle cursor with odd size")
    {
        int rectangleSize = 3;
        RectangleCursor rectangleCursor(rectangleSize);

        WHEN("pointer position is at the origin")
        {
            PointerInfo pointer = PointerInfoBuilder().withCurr(Vec2(0, 0)).build();

            THEN("it sets the cursor to the correct position")
            {

                rectangleCursor.update(tempLayer, pointer);

                std::vector<Rect2D *> &rects = tempLayer.getTiles();

                REQUIRE_THAT(rects[0]->getBounds(), EqualsBounds(Bounds(-1.0f, -1.0f, 2.0f, 2.0f)));
            }
        }
    }
}