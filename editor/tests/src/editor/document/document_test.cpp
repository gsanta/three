#include "../src/app/document/document.h"
#include "../test_helpers/builders/document_builder.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::editor;

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
                REQUIRE(clone.getCanvases().size() == 1);
                REQUIRE(&document.getCanvases()[0] != &clone.getCanvases()[0]);
            }
        }
    }
}
