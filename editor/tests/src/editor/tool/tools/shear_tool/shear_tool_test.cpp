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

void expect_1_tile_horizontal_displacement(const TileLayer &tempLayer)
{
    REQUIRE(tempLayer.getTiles().size() == 16);

    // changed bottom row
    for (int i = 3; i <= 6; i++)
    {
        REQUIRE(tempLayer.getAtTilePos(i, 1) != nullptr);
    }

    // changed top row
    for (int i = 1; i <= 4; i++)
    {
        REQUIRE(tempLayer.getAtTilePos(i, 4) != nullptr);
    }

    // did not change
    for (int i = 2; i <= 5; i++)
    {
        for (int j = 2; j <= 3; j++)
        {
            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
        }
    }
}

void expect_2_tiles_horizontal_displacement(const TileLayer &tempLayer)
{
    REQUIRE(tempLayer.getTiles().size() == 16);

    // changed bottom rows
    for (int i = 4; i <= 7; i++)
    {
        REQUIRE(tempLayer.getAtTilePos(i, 1) != nullptr);
    }

    // changed top row
    for (int i = 0; i <= 3; i++)
    {
        REQUIRE(tempLayer.getAtTilePos(i, 4) != nullptr);
    }

    // did not change
    for (int i = 2; i <= 5; i++)
    {
        for (int j = 2; j <= 3; j++)
        {
            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
        }
    }
}

void expect_nothing_changed(const TileLayer &tempLayer)
{
    REQUIRE(tempLayer.getTiles().size() == 16);

    for (int i = 2; i <= 5; i++)
    {
        for (int j = 1; j <= 4; j++)
        {
            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
        }
    }
}

void execute_shear(ToolContext &toolContext, ContentBuilder &contentBuilder, const Vec2Int &delta)
{
    const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();
    Vec2Int shearCenter = selectionBounds.getCenter();

    ShearTool &shearTool = toolContext.tools->getShearTool();

    shearTool.execPointerDown(toolContext);
    contentBuilder.setPrevCurrDown(shearCenter + delta);

    shearTool.execPointerMove(toolContext);
    shearTool.execPointerUp(toolContext);
}

SCENARIO("Shear tool")
{
    using namespace spright::editor;

    GIVEN("A drawing with a 4x4 rectangle")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 14, 14))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        ContentBuilder contentBuilder(document, toolContext);
        contentBuilder.buildRect(BoundsInt(2, 1, 5, 4));

        Drawing &drawing = document.getActiveDrawing();
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayerOfActiveLayer();
        TileLayer &toolLayer = drawing.getToolLayer();

        ShearTool shearTool;

        WHEN("selecting the rectangle")
        {
            contentBuilder.selectTiles(activeLayer.getTiles());

            WHEN("moving the mouse in positive horizontal direction and releasing it (positive angle)")
            {
                execute_shear(toolContext, contentBuilder, Vec2Int(shearTool.getTileLenghtFor10DegShear() * 2, 0));

                THEN("displaces the top row to left direction and bottom row to right direction by one tile")
                {
                    expect_1_tile_horizontal_displacement(tempLayer);
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(toolLayer.getTiles().size() == 24);
                    REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(1, 1, 6, 4)));
                }

                WHEN("moving the mouse in the same direction again")
                {
                    execute_shear(toolContext, contentBuilder, Vec2Int(shearTool.getTileLenghtFor10DegShear() * 2, 0));

                    THEN("the tiles get displaced one more tile to the left and right")
                    {
                        expect_2_tiles_horizontal_displacement(tempLayer);
                    }

                    WHEN("undo is called")
                    {
                        document.getHistory()->undo(document);

                        THEN("it restores the previous tiles")
                        {
                            expect_1_tile_horizontal_displacement(tempLayer);
                        }

                        THEN("it restores the previous selection")
                        {
                            REQUIRE(toolLayer.getTiles().size() == 24);
                            REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(1, 1, 6, 4)));
                        }

                        WHEN("undo is called second time")
                        {
                            document.getHistory()->undo(document);

                            THEN("it restores the original tiles")
                            {
                                expect_nothing_changed(tempLayer);
                            }

                            THEN("it restores the original selection")
                            {
                                REQUIRE(toolLayer.getTiles().size() == 16);
                                REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(2, 1, 5, 4)));
                            }

                            WHEN("redo is called")
                            {
                                document.getHistory()->redo(document);

                                THEN("it applies the first changes again")
                                {
                                    expect_1_tile_horizontal_displacement(tempLayer);
                                }

                                THEN("it selects the tiles resulted from the first changes")
                                {
                                    REQUIRE(toolLayer.getTiles().size() == 24);
                                    REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(1, 1, 6, 4)));
                                }
                            }
                        }
                    }
                }
            }

            WHEN("moving the mouse in negative horizontal direction and releasing it (negative angle)")
            {
                shearTool.setShearDirectionAsHorizontal();
                shearTool.setShearInRad(-0.3926991f); //-22.5deg
                shearTool.execute(toolContext);

                THEN("displaces the top row to right direction and bottom row to left direction by one tile")
                {
                    REQUIRE(tempLayer.getTiles().size() == 16);

                    // changed tiles
                    REQUIRE(tempLayer.getAtTilePos(6, 4) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(1, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 1) == nullptr);
                    REQUIRE(tempLayer.getAtTilePos(2, 4) == nullptr);

                    // did not change
                    for (int i = 1; i <= 3; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(i, 1) != nullptr);
                    }

                    for (int i = 2; i <= 5; i++)
                    {
                        for (int j = 2; j <= 3; j++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 3; i <= 5; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(i, 4) != nullptr);
                    }
                }
            }

            WHEN("moving the mouse in positive vertial direction and releasing it (positive angle)")
            {
                shearTool.setShearDirectionAsVertical();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("displaces the top row to left direction and bottom row to right direction by one tile")
                {
                    REQUIRE(tempLayer.getTiles().size() == 16);

                    // changed tiles
                    REQUIRE(tempLayer.getAtTilePos(2, 0) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 5) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 1) == nullptr);
                    REQUIRE(tempLayer.getAtTilePos(2, 4) == nullptr);

                    // did not change
                    for (int i = 0; i <= 3; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(2, i) != nullptr);
                    }

                    for (int i = 3; i <= 4; i++)
                    {
                        for (int j = 1; j <= 4; j++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 2; i <= 5; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(5, i) != nullptr);
                    }
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(toolLayer.getTiles().size() == 24);
                    REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(2, 0, 5, 5)));
                }
            }

            WHEN("moving the mouse without releasing it")
            {
                const BoundsInt &selectionBounds =
                    toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();
                Vec2Int shearCenter = selectionBounds.getCenter();

                ShearTool &shearTool = toolContext.tools->getShearTool();

                shearTool.execPointerDown(toolContext);
                contentBuilder.setCurr(shearCenter + Vec2Int(shearTool.getTileLenghtFor10DegShear() * 2, 0));
                shearTool.execPointerMove(toolContext);

                THEN("shear happens")
                {
                    expect_1_tile_horizontal_displacement(tempLayer);
                }

                WHEN("moving the mouse further in the same direction")
                {
                    contentBuilder.setCurr(shearCenter + Vec2Int(shearTool.getTileLenghtFor10DegShear() * 4, 0));

                    shearTool.execPointerMove(toolContext);

                    THEN("it shears the original shape with a bigger angle")
                    {
                        // expect_2_tiles_horizontal_displacement(activeLayer);
                        REQUIRE(tempLayer.getTiles().size() == 16);

                        for (int i = 4; i <= 7; i++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, 1) != nullptr);
                        }

                        for (int i = 3; i <= 6; i++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, 2) != nullptr);
                        }

                        for (int i = 1; i <= 4; i++)
                        {
                            for (int j = 3; j <= 4; j++)
                            {
                                REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
                            }
                        }
                    }

                    WHEN("moving back the mouse to start position and releasing it")
                    {
                        contentBuilder.setPrevCurrDown(shearCenter);
                        shearTool.execPointerMove(toolContext);
                        shearTool.execPointerUp(toolContext);

                        THEN("the shear is undone")
                        {
                            expect_nothing_changed(tempLayer);
                        }
                    }
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
        TileLayer &tempLayer = drawing.getTempLayerOfActiveLayer();
        TileLayer &toolLayer = drawing.getToolLayer();

        ShearTool shearTool;

        WHEN("selecting the rectangle")
        {
            contentBuilder.selectTiles(activeLayer.getTiles());

            WHEN("moving the mouse in positive horizontal direction and releasing it (positive angle)")
            {
                shearTool.setShearDirectionAsHorizontal();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("the out of bounds tile gets removed")
                {
                    REQUIRE(tempLayer.getTiles().size() == 15);

                    // changed tiles
                    REQUIRE(tempLayer.getAtTilePos(4, 0) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(0, 0) == nullptr);
                    REQUIRE(tempLayer.getAtTilePos(3, 3) == nullptr);

                    // did not change
                    for (int i = 1; i <= 4; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(i, 0) != nullptr);
                    }

                    for (int i = 0; i <= 3; i++)
                    {
                        for (int j = 1; j <= 2; j++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 0; i <= 2; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(i, 3) != nullptr);
                    }
                }

                THEN("it updates the selection to cover the sheared area")
                {
                    REQUIRE(toolLayer.getTiles().size() == 20);
                    REQUIRE_THAT(toolLayer, HasTilesWithinArea(BoundsInt(0, 0, 4, 3)));
                }
            }

            WHEN("moving the mouse in positive vertial direction and releasing it (positive angle)")
            {
                shearTool.setShearDirectionAsVertical();
                shearTool.setShearInRad(0.3926991f); //22.5deg
                shearTool.execute(toolContext);

                THEN("the out of bounds tile gets removed")
                {
                    REQUIRE(tempLayer.getTiles().size() == 15);

                    // changed tiles
                    REQUIRE(tempLayer.getAtTilePos(3, 4) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(0, 3) == nullptr);
                    REQUIRE(tempLayer.getAtTilePos(3, 0) == nullptr);

                    // did not change
                    for (int i = 0; i <= 2; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(0, i) != nullptr);
                    }

                    for (int i = 1; i <= 2; i++)
                    {
                        for (int j = 0; j <= 3; j++)
                        {
                            REQUIRE(tempLayer.getAtTilePos(i, j) != nullptr);
                        }
                    }

                    for (int i = 1; i <= 4; i++)
                    {
                        REQUIRE(tempLayer.getAtTilePos(3, i) != nullptr);
                    }
                }
            }
        }
    }
}
