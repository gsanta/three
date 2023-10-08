#include "./shear_tool.h"

#include "../../select_tool/select_tool.h"

namespace spright
{
namespace editor
{
    ShearTool::ShearTool() : Tool("shear")
    {
    }

    void ShearTool::pointerDown(const ToolContext &toolContext)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
        const SelectionBuffer &selectionBuffer = toolContext.tools->getSelectTool().getSelectionBuffer();

        m_RestorableArea.saveArea(
            activeLayer,
            selectionBuffer.getTileIndexes(),
            getBoundsOfImpactedArea(selectionBuffer.getTileBounds(), activeLayer.getTileBounds()));
    }

    void ShearTool::pointerMove(const ToolContext &toolContext)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();
        Vec2 center = activeLayer.getCenterPos(selectionBounds.getCenter());

        calcShearDirection(activeLayer, toolContext.pointer.curr, center);
        double angle = calcShearAngle(activeLayer, toolContext.pointer.curr, center);

        if (angle != m_PrevShearAngle)
        {
            const SelectionBuffer &selectionBuffer = toolContext.tools->getSelectTool().getSelectionBuffer();

            BoundsInt currentBounds = selectionBuffer.getTileBounds();

            m_RestorableArea.restoreArea(activeLayer, toolContext.tools->getSelectTool().getSelectionBuffer());
            const std::vector<int> &restoredIndexes = m_RestorableArea.getOriginalSelectedIndexes();
            toolContext.tools->getSelectTool().setSelection(restoredIndexes, *toolContext.doc.activeDrawing);

            m_RestorableArea.saveArea(activeLayer,
                                      m_RestorableArea.getOriginalSelectedIndexes(),
                                      getBoundsOfImpactedArea(currentBounds, activeLayer.getTileBounds()));

            shearSelection(toolContext, angle);
            m_PrevShearAngle = angle;
        }
    }

    void ShearTool::shearSelection(const ToolContext &toolContext, double angle)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();

        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::cout << angle * 180 / M_PI << std::endl;

        if (angle != 0)
        {
            m_ShearInRad = angle;
            execute(toolContext);
        }
    }

    void ShearTool::execute(const ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
        BoundsInt bounds = BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight());

        std::vector<int> newIndexes;

        if (m_IsHorizontal)
        {
            newIndexes = shear_horizontal(activeLayer, bounds, m_ShearInRad);
        }
        else
        {
            newIndexes = shear_vertical(activeLayer, bounds, m_ShearInRad);
        }

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

    void ShearTool::setShearInRad(float rad)
    {
        m_ShearInRad = rad;
    }

    void ShearTool::setShearDirectionAsVertical()
    {
        m_IsHorizontal = false;
    }

    void ShearTool::setShearDirectionAsHorizontal()
    {
        m_IsHorizontal = true;
    }

    void ShearTool::calcShearDirection(const TileLayer &layer, const Vec2 &cursorPos, const Vec2 &centerPos)
    {
        Vec2Int cursorTile = layer.getTilePos(cursorPos);
        Vec2Int centerTile = layer.getTilePos(centerPos);
        Vec2Int delta = cursorTile - centerTile;

        double len = cursorTile.distance(centerTile);

        if (std::abs(delta.x) < std::abs(delta.y))
        {
            setShearDirectionAsVertical();
        }
        else
        {
            setShearDirectionAsHorizontal();
        }
    }


    double ShearTool::calcShearAngle(const TileLayer &layer, const Vec2 &cursorPos, const Vec2 &centerPos) const
    {
        Vec2Int cursorTile = layer.getTilePos(cursorPos);
        Vec2Int centerTile = layer.getTilePos(centerPos);
        Vec2Int delta = cursorTile - centerTile;

        double len = cursorTile.distance(centerTile);

        double sign = 1.0f;

        if (m_IsHorizontal)
        {
            if (cursorTile.x < centerTile.x)
            {
                sign = -1.0f;
            }
        }
        else
        {
            if (cursorTile.y < centerTile.y)
            {
                sign = -1.0f;
            }
        }

        //10deg
        double shearIncrement = 0.174533;

        int lenIncrement = 2.0f;

        double multiplier = (int)(len / lenIncrement);

        double angle = shearIncrement * multiplier * sign;

        if (angle > m_MaxShear)
        {
            return m_MaxShear;
        }
        else if (angle < -m_MaxShear)
        {
            return -m_MaxShear;
        }
        else
        {
            return angle;
        }
    }

    BoundsInt ShearTool::getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const
    {
        Vec2Int center = selectionBounds.getCenter();
        int size = selectionBounds.getWidth();

        int bottomLeftX = center.x - size > maxBounds.minX ? center.x - size : maxBounds.minX;
        int bottomLeftY = center.y - size > maxBounds.minY ? center.y - size : maxBounds.minY;
        int topRightX = center.x + size < maxBounds.maxX ? center.x + size : maxBounds.maxX;
        int topRightY = center.y + size < maxBounds.maxY ? center.y + size : maxBounds.maxY;

        return BoundsInt(bottomLeftX, bottomLeftY, topRightX, topRightY);
    }
} // namespace editor
} // namespace spright
