#include "select_tool.h"

#include "../tools/rotate_tool/rotate_tool.h"

namespace spright
{
namespace editor
{

    const int SelectTool::MODE_MOVE = 0;
    const int SelectTool::MODE_ROTATE = 1;

    const int SelectTool::PHASE_SELECTION = 0;
    const int SelectTool::PHASE_MANIPULATION = 1;

    SelectTool::SelectTool()
        : Tool("select", std::make_shared<RectangleCursor>(1)), m_SelectionBuffer(std::make_shared<SelectionBuffer>())
    {
        m_BoxSelector = std::make_unique<BoxSelector>(m_SelectionBuffer);
        m_SelectionMover = std::make_unique<SelectionMover>();
    }

    void SelectTool::pointerDown(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        int tileIndex = tempLayer.getTileIndex(context.pointer.curr);

        if (tempLayer.getAtTileIndex(tileIndex) != nullptr)
        {
            m_Phase = PHASE_MANIPULATION;

            if (m_Mode == MODE_ROTATE)
            {
                context.tools->getRotateTool().pointerDown(context);
            }
        }
        else
        {
            m_Phase = PHASE_SELECTION;
        }
    }

    void SelectTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown)
        {
            return;
        }

        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_Phase == PHASE_SELECTION)
        {
            if (!m_BoxSelector->isSelectionChanged(tempLayer,
                                                   context.pointer.curr,
                                                   context.pointer.prev,
                                                   context.pointer.down))
            {
                return;
            }

            tempLayer.clear();
            m_BoxSelector->select(activeLayer, tempLayer, context.pointer.curr, context.pointer.down);
        }
        else if (m_Phase == PHASE_MANIPULATION)
        {
            switch (m_Mode)
            {
            case MODE_ROTATE:
                context.tools->getRotateTool().pointerMove(context);
                break;

            default:
                m_SelectionMover->move(tempLayer, context.pointer.curr, context.pointer.prev, context.pointer.down);

                m_SelectionMover->move(activeLayer,
                                       m_SelectionBuffer->getTileIndexes(),
                                       context.pointer.curr,
                                       context.pointer.prev,
                                       context.pointer.down);
                break;
            }
        }
    }

    void SelectTool::pointerUp(const ToolContext &context)
    {
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        recalcTileIndexesAndBounds(activeLayer, tempLayer);

        if (m_Phase == PHASE_SELECTION)
        {
            if (context.pointer.downDelta().length() < m_NoMovementTolerance)
            {
                TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

                tempLayer.clear();
                m_SelectionBuffer->clear();
            }
        }
        else if (m_Phase == PHASE_MANIPULATION)
        {
            if (m_Mode == MODE_ROTATE)
            {
                context.tools->getRotateTool().pointerUp(context);
            }
        }

        m_Phase = PHASE_SELECTION;
    }

    void SelectTool::setMode(int mode)
    {
        switch (mode)
        {
        case MODE_ROTATE:
            m_Mode = mode;
            break;
        default:
            m_Mode = MODE_MOVE;
            break;
        }
    }

    void SelectTool::setSelection(const std::vector<int> &indexes, Drawing &drawing)
    {
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayer();

        m_SelectionBuffer->setTileIndexes(indexes, activeLayer);

        const BoundsInt &bounds = m_SelectionBuffer->getTileBounds();

        m_BoxSelector->select(activeLayer,
                              tempLayer,
                              tempLayer.getCenterPos(bounds.getBottomLeft()),
                              tempLayer.getCenterPos(bounds.getTopRight() + -1));
    }

    void SelectTool::recalcTileIndexesAndBounds(TileLayer &activeLayer, TileLayer &tempLayer)
    {
        std::vector<int> currentTileIndexes = m_SelectionBuffer->getTileIndexes();
        std::vector<int> newTileIndexes;

        for (int tileIndex : m_SelectionBuffer->getTileIndexes())
        {
            Rect2D *tile = activeLayer.getAtTileIndex(tileIndex);
            if (tile != nullptr)
            {
                newTileIndexes.push_back(activeLayer.updateTileIndex(tile));
            }
        }

        m_SelectionBuffer->setTileIndexes(newTileIndexes, activeLayer);

        for (Rect2D *tile : tempLayer.getTiles())
        {
            tempLayer.updateTileIndex(tile);
        }
    }

    SelectionBuffer &SelectTool::getSelectionBuffer()
    {
        return *m_SelectionBuffer;
    }
} // namespace editor
} // namespace spright
