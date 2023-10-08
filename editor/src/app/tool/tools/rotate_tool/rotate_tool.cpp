#include "./rotate_tool.h"

namespace spright
{
namespace editor
{
    RotateTool::RotateTool() : Tool("rotate")
    {
        m_Timer = Timer::getTimer();
    }

    void RotateTool::pointerDown(const ToolContext &toolContext)
    {
        m_Timer->reset();

        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();

        saveImpactedArea(activeLayer, toolContext.tools->getSelectTool().getSelectionBuffer());
    }

    void RotateTool::pointerMove(const ToolContext &toolContext)
    {
        double angle = getRotationAngle(toolContext.pointer.curr);

        if (angle != m_PrevRotationAngle)
        {
            restoreImpactedArea(toolContext);
            rotateSelection(toolContext, angle);
            m_PrevRotationAngle = angle;
        }
    }

    void RotateTool::pointerUp(const ToolContext &toolContext)
    {
    }

    void RotateTool::setRotationInRad(float rad)
    {
        m_RotateInRad = rad;
    }

    void RotateTool::execute(ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             m_RotateInRad);

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

    void RotateTool::saveImpactedArea(const TileLayer &activeLayer, const SelectionBuffer &selectionBuffer)
    {
        m_OrigIndexes.clear();
        m_OrigTiles.reset(new TileView(activeLayer.getBounds(), activeLayer.getTileSize()));

        const BoundsInt &selectionBounds = selectionBuffer.getTileBounds();
        const BoundsInt impactBounds = getBoundsOfImpactedArea(selectionBounds, activeLayer.getTileBounds());

        Vec2Int center = selectionBounds.getCenter();
        m_RotationCenter = activeLayer.getCenterPos(center);

        tile_operation_copy_area(activeLayer, *m_OrigTiles, impactBounds, impactBounds.getBottomLeft());

        for (Rect2D *tile : m_OrigTiles->getTiles())
        {
            m_OrigIndexes.push_back(m_OrigTiles->getTileIndex(*tile));
        }
    }

    void RotateTool::restoreImpactedArea(const ToolContext &toolContext)
    {
        SelectTool &selectTool = toolContext.tools->getSelectTool();
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();

        const std::vector<int> &oldIndexes = selectTool.getSelectionBuffer().getTileIndexes();

        for (int index : oldIndexes)
        {
            activeLayer.removeAt(index);
        }

        tile_operation_copy_all(*m_OrigTiles, activeLayer);

        selectTool.setSelection(m_OrigIndexes, *toolContext.doc.activeDrawing);
    }

    void RotateTool::rotateSelection(const ToolContext &toolContext, double angle)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             angle);

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

    /*
    // Get the maximum area that can be impacted by the rotation, so original state can be restored
    */
    BoundsInt RotateTool::getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const
    {
        Vec2Int center = selectionBounds.getCenter();
        int size = selectionBounds.getWidth() > selectionBounds.getHeight() ? selectionBounds.getWidth()
                                                                            : selectionBounds.getHeight();
        int halfSize = ((int)size / 2.0) + 1;

        int bottomLeftX = center.x - halfSize > maxBounds.minX ? center.x - halfSize : maxBounds.minX;
        int bottomLeftY = center.y - halfSize > maxBounds.minY ? center.y - halfSize : maxBounds.minY;
        int topRightX = center.x + halfSize < maxBounds.maxX ? center.x + halfSize : maxBounds.maxX;
        int topRightY = center.y + halfSize < maxBounds.maxY ? center.y + halfSize : maxBounds.maxY;

        return BoundsInt(bottomLeftX, bottomLeftY, topRightX, topRightY);
    }

    double RotateTool::getRotationAngle(Vec2 cursorPos)
    {
        Vec2 dir = cursorPos - m_RotationCenter;
        double angle = std::atan2(dir.y, dir.x);

        double normalizedAngle = 0;

        double approx = 0.01;

        if (angle > 0 && angle <= M_PI_2)
        {
            normalizedAngle = M_PI_2 - angle;
        }
        else if (angle > M_PI_2 && angle <= M_PI + approx)
        {
            normalizedAngle = 3 * M_PI_2 + M_PI - angle;
        }
        else
        {
            normalizedAngle = M_PI_2 - angle;
        }

        double finalAngle = 0;

        for (int i = 0; i < m_RotationPoints.size() - 1; i++)
        {
            double prevAngle = m_RotationPoints[i];
            double nextAngle = m_RotationPoints[i + 1];
            if (normalizedAngle > prevAngle && normalizedAngle <= nextAngle)
            {
                double prevDiff = normalizedAngle - prevAngle;
                double nextDiff = nextAngle - normalizedAngle;

                if (prevDiff < nextDiff)
                {
                    finalAngle = prevAngle;
                }
                else
                {
                    finalAngle = nextAngle;
                }
            }
        }

        return finalAngle;
    }
} // namespace editor
} // namespace spright
