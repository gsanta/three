#include "../../../test_helpers/builders/content_builder.h"
#include "../../../test_helpers/document_builder.h"
#include "../../../test_helpers/drawing_builder.h"
#include "../../../test_helpers/matchers/has_tiles_within_area_matcher.h"
#include "../../../test_helpers/tile_layer_builder.h"
#include "../../../test_helpers/tool_context_builder.h"
#include "../src/app/tool/tools/rectangle_tool/rectangle_tool.h"
#include "../src/app/tool/tools/select_tool/select_tool.h"
#include "../src/app/tool/tools/shear_tool/shear_tool.h"

#include <catch2/catch_test_macros.hpp>

SCENARIO("Shear tool")
{
    using namespace spright::editor;

    GIVEN("A drawing with a 4x4 rectangle")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 12, 12))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        ContentBuilder contentBuilder(document, toolContext);
        contentBuilder.buildRect(BoundsInt(2, 1, 5, 4));

        Drawing &drawing = document.getActiveDrawing();
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayer();

        ShearTool shearTool;

        WHEN("selecting the rectangle")
        {
            contentBuilder.selectTiles(activeLayer.getTiles());

            WHEN("shearing in horizontal direction with positive angle")
            {
                shearTool.setShearDirectionAsHorizontal();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("displaces the top row to left direction and bottom row to right direction by one tile")
                {
                    REQUIRE(activeLayer.getTiles().size() == 16);

                    // changed bottom row
                    for (int i = 3; i <= 6; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 1) != nullptr);
                    }

                    // changed top row
                    for (int i = 1; i <= 4; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 4) != nullptr);
                    }

                    // did not change
                    for (int i = 2; i <= 5; i++)
                    {
                        for (int j = 2; j <= 3; j++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(tempLayer.getTiles().size() == 24);
                    REQUIRE_THAT(tempLayer, HasTilesWithinArea(BoundsInt(1, 1, 6, 4)));
                }

                WHEN("executing the shear again")
                {
                    shearTool.execute(toolContext);

                    THEN("the tiles get displaced one more tile to the left and right")
                    {
                        REQUIRE(activeLayer.getTiles().size() == 16);

                        // changed bottom row
                        for (int i = 4; i <= 6; i++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, 1) != nullptr);
                        }

                        // changed top row
                        for (int i = 0; i <= 2; i++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, 4) != nullptr);
                        }

                        // did not change
                        for (int i = 2; i <= 5; i++)
                        {
                            for (int j = 2; j <= 3; j++)
                            {
                                REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                            }
                        }
                    }
                }
            }

            WHEN("shearing in horizontal direction with negative angle")
            {
                shearTool.setShearDirectionAsHorizontal();
                shearTool.setShearInRad(-0.3926991f); //-22.5deg
                shearTool.execute(toolContext);

                THEN("displaces the top row to right direction and bottom row to left direction by one tile")
                {
                    REQUIRE(activeLayer.getTiles().size() == 16);

                    // changed tiles
                    REQUIRE(activeLayer.getAtTilePos(6, 4) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(1, 1) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(5, 1) == nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 4) == nullptr);

                    // did not change
                    for (int i = 1; i <= 3; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 1) != nullptr);
                    }

                    for (int i = 2; i <= 5; i++)
                    {
                        for (int j = 2; j <= 3; j++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 3; i <= 5; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 4) != nullptr);
                    }
                }
            }

            WHEN("shearing in vertical direction with positive angle")
            {
                shearTool.setShearDirectionAsVertical();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("displaces the top row to left direction and bottom row to right direction by one tile")
                {
                    REQUIRE(activeLayer.getTiles().size() == 16);

                    // changed tiles
                    REQUIRE(activeLayer.getAtTilePos(2, 0) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(5, 5) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(5, 1) == nullptr);
                    REQUIRE(activeLayer.getAtTilePos(2, 4) == nullptr);

                    // did not change
                    for (int i = 0; i <= 3; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(2, i) != nullptr);
                    }

                    for (int i = 3; i <= 4; i++)
                    {
                        for (int j = 1; j <= 4; j++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 2; i <= 5; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(5, i) != nullptr);
                    }
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(tempLayer.getTiles().size() == 24);
                    REQUIRE_THAT(tempLayer, HasTilesWithinArea(BoundsInt(2, 0, 5, 5)));
                }
            }
        }
    }

    GIVEN("a drawing with a 4x4 rectangle drawing at the bottom left corner")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 12, 12))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        ContentBuilder contentBuilder(document, toolContext);

        contentBuilder.buildRect(BoundsInt(0, 0, 3, 3));

        Drawing &drawing = document.getActiveDrawing();
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayer();

        ShearTool shearTool;

        WHEN("selecting the rectangle")
        {
            contentBuilder.selectTiles(activeLayer.getTiles());

            WHEN("shearing in horizontal direction with positive angle")
            {
                shearTool.setShearDirectionAsHorizontal();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("the out of bounds tile gets removed")
                {
                    REQUIRE(activeLayer.getTiles().size() == 15);

                    // changed tiles
                    REQUIRE(activeLayer.getAtTilePos(4, 0) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(0, 0) == nullptr);
                    REQUIRE(activeLayer.getAtTilePos(3, 3) == nullptr);

                    // did not change
                    for (int i = 1; i <= 4; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 0) != nullptr);
                    }

                    for (int i = 0; i <= 3; i++)
                    {
                        for (int j = 1; j <= 2; j++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 0; i <= 2; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(i, 3) != nullptr);
                    }
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(tempLayer.getTiles().size() == 20);
                    REQUIRE_THAT(tempLayer, HasTilesWithinArea(BoundsInt(0, 0, 4, 3)));
                }
            }

            WHEN("shearing in vertical direction with positive angle")
            {
                shearTool.setShearDirectionAsVertical();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("the out of bounds tile gets removed")
                {
                    REQUIRE(activeLayer.getTiles().size() == 15);

                    // changed tiles
                    REQUIRE(activeLayer.getAtTilePos(3, 4) != nullptr);
                    REQUIRE(activeLayer.getAtTilePos(0, 3) == nullptr);
                    REQUIRE(activeLayer.getAtTilePos(3, 0) == nullptr);

                    // did not change
                    for (int i = 0; i <= 2; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(0, i) != nullptr);
                    }

                    for (int i = 1; i <= 2; i++)
                    {
                        for (int j = 0; j <= 3; j++)
                        {
                            REQUIRE(activeLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 1; i <= 4; i++)
                    {
                        REQUIRE(activeLayer.getAtTilePos(3, i) != nullptr);
                    }
                }
            }
        }
    }
}
