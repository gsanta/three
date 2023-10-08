#include "./rotate_tool.h"

namespace spright
{
namespace editor
{
    RotateTool::RotateTool() : Tool("rotate")
    {
    }

    void RotateTool::pointerDown(const ToolContext &toolContext)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();

        const SelectionBuffer &selectionBuffer = toolContext.tools->getSelectTool().getSelectionBuffer();

        m_RestorableArea.saveArea(
            activeLayer,
            selectionBuffer.getTileIndexes(),
            getBoundsOfImpactedArea(selectionBuffer.getTileBounds(), activeLayer.getTileBounds()));
    }

    void RotateTool::pointerMove(const ToolContext &toolContext)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();
        Vec2 center = activeLayer.getCenterPos(selectionBounds.getCenter());

        double angle = getRotationAngle(toolContext.pointer.curr, center);

        if (angle != m_PrevRotationAngle)
        {
            m_RestorableArea.restoreArea(activeLayer, toolContext.tools->getSelectTool().getSelectionBuffer());
            const std::vector<int> &restoredIndexes = m_RestorableArea.getOriginalSelectedIndexes();
            toolContext.tools->getSelectTool().setSelection(restoredIndexes, *toolContext.doc.activeDrawing);

            rotateSelection(toolContext, angle);
            m_PrevRotationAngle = angle;
        }
    }

    void RotateTool::setRotationInRad(float rad)
    {
        m_RotateInRad = rad;
    }

    void RotateTool::execute(const ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             m_RotateInRad);

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

    void RotateTool::rotateSelection(const ToolContext &toolContext, double angle)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             angle);

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

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

    double RotateTool::getRotationAngle(const Vec2 &cursorPos, const Vec2 &centerPos) const
    {
        Vec2 dir = cursorPos - centerPos;
        double angle = std::atan2(dir.y, dir.x);

        double normalizedAngle = getNormalizedAngle(angle);
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

    double RotateTool::getNormalizedAngle(double angle) const
    {
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

        return normalizedAngle;
    }
} // namespace editor
} // namespace spright
