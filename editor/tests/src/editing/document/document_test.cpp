#include "../../test_helpers/builders/document_builder.h"
#include "../../test_helpers/builders/drawing_builder.h"
#include "../src/editing/document/document.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

using namespace spright::editing;

SCENARIO("Document")
{
    GIVEN("an empty document")
    {
        Document document = DocumentBuilder().withEmptyDocument().build();
        TileCanvas c1 = DrawingBuilder().build();
        TileCanvas c2 = DrawingBuilder().build();

        WHEN("adding a canvas to the document")
        {
            Canvas &canvas1 = document.addCanvas(c1);

            WHEN("copying the document")
            {
                Document clone(document);

                THEN("all members are copied")
                {
                    REQUIRE(clone.getCanvasCount() == 1);
                    REQUIRE(document.getCanvas(0) != clone.getCanvas(0));
                }
            }

            WHEN("it is the first canvas")
            {
                THEN("it becomes the active canvas")
                {
                    REQUIRE(document.getActiveCanvas() == &canvas1);
                }
            }

            WHEN("adding a second canvas")
            {
                Canvas &canvas2 = document.addCanvas(c1);

                THEN("it does not become the active canvas")
                {
                    REQUIRE(document.getActiveCanvas() == &canvas1);
                }

                WHEN("removing a canvas")
                {
                    document.removeCanvas(canvas1);

                    THEN("the canvas is removed from the document")
                    {
                        REQUIRE(document.getCanvasCount() == 1);
                        REQUIRE(document.getCanvas(0) == &canvas2);
                    }
                }

                WHEN("removing a canvas that is not part of the document")
                {
                    document.removeCanvas(canvas1);

                    THEN("the canvas is removed from the document")
                    {
                        REQUIRE_THROWS_WITH(document.removeCanvas(canvas1), "Canvas was not found in the document.");
                    }
                }

                WHEN("setting the active canvas")
                {
                    document.setActiveCanvas(canvas2);

                    THEN("active canvas changes")
                    {
                        REQUIRE(document.getActiveCanvas() == &canvas2);
                    }

                    WHEN("removing the active canvas")
                    {
                        document.removeCanvas(canvas2);

                        THEN("active canvas becomes null")
                        {
                            REQUIRE(document.getActiveCanvas() == nullptr);
                        }
                    }
                }

                WHEN("getting the index of the second canvas")
                {
                    int index = document.getCanvasIndex(canvas2);

                    THEN("it returns with the canvas's index")
                    {
                        REQUIRE(index == 1);
                    }
                }

                WHEN("getting the index of a canvas not in the document")
                {
                    int index = document.getCanvasIndex(DrawingBuilder().build());

                    THEN("it returns -1")
                    {
                        REQUIRE(index == -1);
                    }
                }
            }
        }
    }
}
