#include "../../../test_helpers/builders/document_builder.h"
#include "../../../test_helpers/builders/drawing_builder.h"
#include "../../../test_helpers/builders/tool_context_builder.h"
#include "../../../test_helpers/common_tool_funcs.h"
#include "../src/editing/tool/tools/rotate_tool/rotate_tool.h"

#include <catch2/catch_test_macros.hpp>

void rotate_from_center_to_delta(ToolContext &toolContext, CommonToolFuncs &commonToolFuncs, const Vec2Int &delta)
{
    TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
    RotateTool &rotateTool = toolContext.tools->getRotateTool();

    const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

    Vec2Int rotationCenter = selectionBounds.getCenter();

    commonToolFuncs.setPrevCurrDown(rotationCenter + delta);

    rotateTool.execPointerDown(toolContext);
    rotateTool.execPointerMove(toolContext);
    rotateTool.execPointerUp(toolContext);
}

void rotate_0_deg(ToolContext &toolContext, CommonToolFuncs &commonToolFuncs)
{
    rotate_from_center_to_delta(toolContext, commonToolFuncs, Vec2Int(0, 1));
}

void rotate_90_deg(ToolContext &toolContext, CommonToolFuncs &commonToolFuncs)
{
    rotate_from_center_to_delta(toolContext, commonToolFuncs, Vec2Int(1, 0));
}

void rotate_180_deg(ToolContext &toolContext, CommonToolFuncs &commonToolFuncs)
{
    rotate_from_center_to_delta(toolContext, commonToolFuncs, Vec2Int(0, -1));
}

void rotate_270_deg(ToolContext &toolContext, CommonToolFuncs &commonToolFuncs)
{
    rotate_from_center_to_delta(toolContext, commonToolFuncs, Vec2Int(-1, 0));
}

void require_not_changed(const TileLayer &activeLayer)
{
    REQUIRE(activeLayer.getTiles().size() == 7);

    REQUIRE(activeLayer.getAtTilePos(4, 0) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(4, 1) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(5, 1) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(4, 2) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(5, 2) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(4, 3) != nullptr);
    REQUIRE(activeLayer.getAtTilePos(5, 3) != nullptr);
}

void require_90_deg_rotation(const TileLayer &tempLayer)
{
    REQUIRE(tempLayer.getTiles().size() == 7);

    REQUIRE(tempLayer.getAtTilePos(3, 3) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(4, 2) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(4, 3) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(5, 2) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(5, 3) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(6, 2) != nullptr);
    REQUIRE(tempLayer.getAtTilePos(6, 3) != nullptr);
}


SCENARIO("Rotate tool")
{
    GIVEN("a shape drawn onto the active layer")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 12, 12))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        CommonToolFuncs commonToolFuncs(document, toolContext);
        commonToolFuncs.buildRect(BoundsInt(4, 1, 5, 3));
        commonToolFuncs.createTile(Vec2Int(4, 0));

        Drawing &drawing = *document.getActiveDrawing();
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &toolLayer = drawing.getToolLayer();
        TileLayer &tempLayer = drawing.getTempLayerOfActiveLayer();

        WHEN("nothing is selected")
        {
            WHEN("executing a 90deg rotation")
            {
                rotate_90_deg(toolContext, commonToolFuncs);

                THEN("shape is not rotated")
                {
                    require_not_changed(activeLayer);
                }
            }
        }

        WHEN("selecting the shape")
        {
            commonToolFuncs.selectRect(BoundsInt(4, 0, 5, 3));

            WHEN("executing a 0deg rotation")
            {
                rotate_0_deg(toolContext, commonToolFuncs);

                THEN("it updates the tiles positions according to the rotation")
                {
                    REQUIRE(tempLayer.getTiles().size() == 7);

                    REQUIRE(tempLayer.getAtTilePos(4, 0) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 3) != nullptr);
                }
            }

            WHEN("executing a 90deg rotation")
            {
                rotate_90_deg(toolContext, commonToolFuncs);

                THEN("it updates the tiles positions according to the rotation")
                {
                    require_90_deg_rotation(tempLayer);
                }

                WHEN("undo is called")
                {
                    document.getHistory()->undo(document);

                    THEN("it restores the state before the rotation")
                    {
                        require_not_changed(tempLayer);
                    }

                    WHEN("redo is called")
                    {
                        document.getHistory()->redo(document);

                        THEN("it reapplies the 90deg rotation")
                        {
                            require_90_deg_rotation(tempLayer);
                        }
                    }
                }
            }

            WHEN("executing a 180deg rotation")
            {
                rotate_180_deg(toolContext, commonToolFuncs);

                THEN("it updates the tiles positions according to the rotation")
                {
                    REQUIRE(tempLayer.getTiles().size() == 7);

                    REQUIRE(tempLayer.getAtTilePos(6, 4) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 3) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 1) != nullptr);
                }
            }

            WHEN("executing a 270deg rotation")
            {
                rotate_270_deg(toolContext, commonToolFuncs);

                THEN("it updates the tiles positions according to the rotation")
                {
                    REQUIRE(tempLayer.getTiles().size() == 7);

                    REQUIRE(tempLayer.getAtTilePos(4, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(4, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(5, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 1) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(6, 2) != nullptr);
                    REQUIRE(tempLayer.getAtTilePos(7, 1) != nullptr);
                }
            }
        }
    }
}
