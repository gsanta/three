#include "select_tool.h"

namespace spright
{
namespace editor
{

    SelectTool::SelectTool(std::shared_ptr<DocumentStore> documentStore)
        : Tool("select", std::make_shared<RectangleCursor>(1)), m_DocumentStore(documentStore),
          m_SelectionBuffer(std::make_shared<SelectionBuffer>(documentStore))
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

            m_SelectionBoundsDirty = true;
        }
        else if (m_BoxSelector->isSelectionChanged(tempLayer,
                                                   context.pointer.curr,
                                                   context.pointer.prev,
                                                   context.pointer.down))
        {
            tempLayer.clear();
            m_BoxSelector->select(tempLayer, context.pointer.curr, context.pointer.down);
            m_SelectionBoundsDirty = true;
            fillTempLayer(tempLayer);
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

        m_SelectionBuffer->setTileIndexes(newTileIndexes);

        for (Rect2D *tile : tempLayer.getTiles())
        {
            tempLayer.updateTileIndex(tile);
        }
    }

    void SelectTool::setSelectedTiles(std::vector<int> indexes, TileLayer &tempLayer)
    {
        m_SelectionBoundsDirty = true;
        m_SelectionBuffer->setTileIndexes(std::move(indexes));
        fillTempLayer(tempLayer);
    }


    std::shared_ptr<SelectionBuffer> SelectTool::getSelectionBuffer()
    {
        return m_SelectionBuffer;
    }

    void SelectTool::fillTempLayer(TileLayer &tempLayer)
    {
        float tileSize = tempLayer.getTileSize();
        unsigned int color = 0x800099ff;

        const BoundsInt &bounds = m_SelectionBuffer->getSelectionBounds();

        tempLayer.clear();

        Vec2Int bottomLeft = bounds.getBottomLeft();
        Vec2Int topRight = bounds.getTopRight();

        for (int i = bottomLeft.x; i <= topRight.x; i++)
        {
            for (int j = bottomLeft.y; j <= topRight.y; j++)
            {
                Vec2 bottomLeft = tempLayer.getBottomLeftPos(Vec2Int(i, j));
                Rect2D rect(bottomLeft.x, bottomLeft.y, tileSize, tileSize, color);

                tempLayer.add(rect);
            }
        }
    }
} // namespace editor
} // namespace spright
