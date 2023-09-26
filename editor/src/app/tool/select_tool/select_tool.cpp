#include "select_tool.h"

namespace spright
{
namespace editor
{

    SelectTool::SelectTool(std::shared_ptr<DocumentStore> documentStore)
        : Tool("select", std::make_shared<RectangleCursor>(1)), m_DocumentStore(documentStore),
          m_SelectionBuffer(std::make_shared<SelectionBuffer>())
    {
        m_BoxSelector = std::make_unique<BoxSelector>(m_SelectionBuffer);
        m_SelectionMover = std::make_unique<SelectionMover>();
    }

    void SelectTool::pointerDown(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        int tileIndex = tempLayer.getTileIndex(context.pointer.curr);
        m_IsMove = tempLayer.getAtTileIndex(tileIndex) != nullptr;
    }

    void SelectTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown)
        {
            return;
        }

        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_IsMove)
        {
            // std::vector<int> tileIndexes;

            // for (Rect2D *tile : tempLayer.getTiles()) {
            //     tileIndexes.push_back(tempLayer.getTileIndex(tile->getCenterPosition2d()));
            // }

            m_SelectionMover->move(tempLayer, context.pointer.curr, context.pointer.prev, context.pointer.down);

            m_SelectionMover->move(activeLayer,
                                   m_SelectionBuffer->getTileIndexes(),
                                   context.pointer.curr,
                                   context.pointer.prev,
                                   context.pointer.down);
        }
        else if (m_BoxSelector->isSelectionChanged(tempLayer,
                                                   context.pointer.curr,
                                                   context.pointer.prev,
                                                   context.pointer.down))
        {
            tempLayer.clear();
            m_BoxSelector->select(activeLayer, tempLayer, context.pointer.curr, context.pointer.down);
        }
    }

    void SelectTool::pointerUp(const ToolContext &context)
    {
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        recalcTileIndexesAndBounds(activeLayer, tempLayer);

        if (!m_IsMove)
        {
            if (context.pointer.downDelta().length() < m_NoMovementTolerance)
            {
                TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

                tempLayer.clear();
                m_SelectionBuffer->clear();
            }
        }

        m_IsMove = false;
    }

    void SelectTool::setSelection(const std::vector<int> &indexes, Drawing &drawing)
    {
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayer();

        const BoundsInt &bounds = m_SelectionBuffer->getTileBounds();

        m_BoxSelector->select(activeLayer,
                              tempLayer,
                              tempLayer.getCenterPos(bounds.getBottomLeft()),
                              tempLayer.getCenterPos(bounds.getTopRight() + -1));

        m_SelectionBuffer->setTileIndexes(indexes, activeLayer);
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
