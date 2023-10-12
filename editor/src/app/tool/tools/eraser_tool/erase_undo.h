
#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../core/history/undoable.h"
#include "../../../document/document.h"

namespace spright
{
namespace editor
{
    class EraseUndo : public Undoable
    {
    public:
        EraseUndo(Document &document);

        void undo(Document &document) const override;

        void redo(Document &document) const override;

        void addTile(std::shared_ptr<Rect2D> rect);

    private:
        std::vector<std::shared_ptr<Rect2D>> m_Rects;

        size_t m_TileLayerPos;

        size_t m_FramePos;

        size_t m_DrawingPos;
    };

} // namespace editor
} // namespace spright
