#include "../src/editing/document/document.h"
#include "../test_helpers/builders/document_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editing;

SCENARIO("Document")
{
    GIVEN("a document with drawings")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 12, 12))).build();

        WHEN("copying the document")
        {
            Document clone(document);

            THEN("the members are copied")
            {
                REQUIRE(clone.getCanvasCount() == 1);
                REQUIRE(document.getCanvas(0) != clone.getCanvas(0));
            }
        }
    }
}
