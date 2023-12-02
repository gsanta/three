
#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/containers/tile_layer.h"
#include "../../../document/document.h"
#include "../../../history/undoable.h"

namespace spright
{
namespace editing
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

        std::string m_DrawingId;
    };

} // namespace editing
} // namespace spright
