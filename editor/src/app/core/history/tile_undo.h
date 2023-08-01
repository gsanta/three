#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document.h"
#include "./undoable.h"

namespace spright
{
namespace editor
{
    class TileUndo : public Undoable
    {
    public:
        static TileUndo createForActiveTileLayer(Document &document);

        void undo(Document &document) const override;

        void redo(Document &document) const override;

        void addTile(std::shared_ptr<Rect2D> prevRect, std::shared_ptr<Rect2D> newRect);

    private:
        TileUndo(Document &document);

        std::vector<std::shared_ptr<Rect2D>> m_PrevList;

        std::vector<std::shared_ptr<Rect2D>> m_NewList;

        size_t m_TileLayerPos;

        size_t m_FramePos;

        size_t m_DrawingPos;
    };

} // namespace editor
} // namespace spright
