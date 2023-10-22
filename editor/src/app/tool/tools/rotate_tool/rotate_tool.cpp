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
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getTempLayerOfActiveLayer();

        const SelectionBuffer &selectionBuffer = toolContext.tools->getSelectTool().getSelectionBuffer();

        m_ImpactedArea = getBoundsOfImpactedArea(selectionBuffer.getTileBounds(), activeLayer.getTileBounds());

        m_Undo.reset(new TileUndo(*toolContext.doc.document, toolContext.tools));
        m_Undo->setPrevTiles(m_ImpactedArea, activeLayer);
        m_Undo->setPrevSelection(selectionBuffer.getTileIndexes());
        m_Undo->setNewTiles(m_ImpactedArea, activeLayer);
        m_Undo->setNewSelection(selectionBuffer.getTileIndexes());
    }

    void RotateTool::pointerMove(const ToolContext &toolContext)
    {
        TileLayer &activeLayer = toolContext.doc.activeDrawing->getTempLayerOfActiveLayer();
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();
        Vec2 center = activeLayer.getCenterPos(selectionBounds.getCenter());

        double angle = getRotationAngle(toolContext.pointer.curr, center);

        if (angle != m_PrevRotationAngle)
        {
            m_Undo->undo(*toolContext.doc.document);

            rotateSelection(toolContext, angle);

            const SelectionBuffer &selectionBuffer = toolContext.tools->getSelectTool().getSelectionBuffer();
            m_Undo->setNewTiles(m_ImpactedArea, activeLayer);
            m_Undo->setNewSelection(selectionBuffer.getTileIndexes());
            m_PrevRotationAngle = angle;
        }
    }

    void RotateTool::pointerUp( ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayerOfActiveLayer();
        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();

        SelectionBuffer &selectionBuffer = context.tools->getSelectTool().getSelectionBuffer();

        context.doc.document->getHistory()->add(std::make_shared<TileUndo>(*m_Undo.get()));
    }

    void RotateTool::setRotationInRad(float rad)
    {
        m_RotateInRad = rad;
    }

    void RotateTool::execute(const ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getTempLayerOfActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             m_RotateInRad);

        toolContext.tools->getSelectTool().syncSelection(*toolContext.doc.activeDrawing, newIndexes);
    }

    void RotateTool::rotateSelection(const ToolContext &toolContext, double angle)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        std::vector<int> newIndexes = rotate(toolContext.doc.activeDrawing->getTempLayerOfActiveLayer(),
                                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                                             angle);

        toolContext.tools->getSelectTool().syncSelection(*toolContext.doc.activeDrawing, newIndexes);
    }

    BoundsInt RotateTool::getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const
    {
        Vec2Int center = selectionBounds.getCenter();
        int size = selectionBounds.getWidth() > selectionBounds.getHeight() ? selectionBounds.getWidth()
                                                                            : selectionBounds.getHeight();
        int bottomLeftX = center.x - size > maxBounds.minX ? center.x - size : maxBounds.minX;
        int bottomLeftY = center.y - size > maxBounds.minY ? center.y - size : maxBounds.minY;
        int topRightX = center.x + size < maxBounds.maxX ? center.x + size : maxBounds.maxX;
        int topRightY = center.y + size < maxBounds.maxY ? center.y + size : maxBounds.maxY;

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
