#include "./tile_undo.h"

namespace spright
{
namespace editing
{
    TileUndo::TileUndo(Document &document, std::shared_ptr<ToolStore> tools) : m_Tools(tools)
    {
        m_DrawingUuid = document.getActiveDrawing()->getUuid();

        m_FrameIndex = document.getActiveDrawing()->getActiveFrameIndex();
        m_TileLayerIndex = document.getActiveDrawing()->getActiveLayerIndex();
    }

    void TileUndo::undo(Document &document) const
    {
        TileLayer &tileLayer = getUndoLayer(document);

        for (std::shared_ptr<Rect2D> rect : m_NewList)
        {
            tileLayer.remove(*rect);
        }

        for (std::shared_ptr<Rect2D> rect : m_PrevList)
        {
            tileLayer.add(*rect);
        }

        m_Tools->getSelectTool().syncSelection(document.getDrawing(m_DrawingUuid), m_PrevSelectedIndexes);
    }

    void TileUndo::redo(Document &document) const
    {
        TileLayer &tileLayer = getRedoLayer(document);

        for (std::shared_ptr<Rect2D> rect : m_PrevList)
        {
            tileLayer.remove(*rect);
        }

        for (std::shared_ptr<Rect2D> rect : m_NewList)
        {
            tileLayer.add(*rect);
        }

        m_Tools->getSelectTool().syncSelection(document.getDrawing(m_DrawingUuid), m_NewSelectedIndexes);
    }

    void TileUndo::setSelection(const std::vector<int> &prevSelectedIndexes, const std::vector<int> &newSelectedIndexes)
    {
        m_PrevSelectedIndexes = prevSelectedIndexes;
        m_NewSelectedIndexes = newSelectedIndexes;
    }

    void TileUndo::addTile(std::shared_ptr<Rect2D> prevRect, std::shared_ptr<Rect2D> newRect)
    {
        if (prevRect)
        {
            auto it = m_NewList.find(prevRect);
            if (it == m_NewList.end())
            {
                m_PrevList.insert(prevRect);
            }
        }

        if (newRect)
        {
            m_NewList.insert(newRect);
        }
    }

    TileUndo TileUndo::createForActiveTileLayer(Document &document, std::shared_ptr<ToolStore> tools)
    {
        return TileUndo(document, tools);
    }

    void TileUndo::setPrevTiles(const BoundsInt &area, const TileLayer &activeLayer)
    {
        setTiles(area, activeLayer, m_PrevList);
    }

    void TileUndo::setNewTiles(const BoundsInt &area, const TileLayer &activeLayer)
    {
        setTiles(area, activeLayer, m_NewList);
    }

    void TileUndo::setTiles(const BoundsInt &area,
                            const TileLayer &activeLayer,
                            std::set<std::shared_ptr<Rect2D>, SharedPtrCompare> &set)
    {
        set.clear();
        for (int i = area.minX; i < area.maxX; i++)
        {
            for (int j = area.minY; j < area.maxY; j++)
            {
                Rect2D *tile = activeLayer.getAtTilePos(i, j);

                if (tile != nullptr)
                {
                    set.insert(std::make_shared<Rect2D>(*tile));
                }
            }
        }
    }

    void TileUndo::setPrevSelection(const std::vector<int> &prevSelectedIndexes)
    {
        m_PrevSelectedIndexes = prevSelectedIndexes;
    }

    void TileUndo::setNewSelection(const std::vector<int> &newSelectedIndexes)
    {
        m_NewSelectedIndexes = newSelectedIndexes;
    }

    bool TileUndo::isEmpty() const
    {
        return m_PrevList.size() == 0 && m_NewList.size() == 0;
    }

    TileLayer &TileUndo::getUndoLayer(Document &document) const
    {
        TileCanvas &drawing = document.getDrawing(m_DrawingUuid);

        if (m_PrevSelectedIndexes.size() > 0)
        {
            return drawing.getTempLayer(m_TileLayerIndex);
        }
        else
        {
            return drawing.getFrames()[m_FrameIndex].getLayers()[m_TileLayerIndex];
        }
    }

    TileLayer &TileUndo::getRedoLayer(Document &document) const
    {
        TileCanvas &drawing = document.getDrawing(m_DrawingUuid);

        if (m_NewSelectedIndexes.size() > 0)
        {
            return drawing.getTempLayer(m_TileLayerIndex);
        }
        else
        {
            return drawing.getFrames()[m_FrameIndex].getLayers()[m_TileLayerIndex];
        }
    }

} // namespace editing
} // namespace spright
