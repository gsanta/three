#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document.h"
#include "./undoable.h"

#include <set>

namespace spright
{
namespace editor
{
    struct SharedPtrCompare
    {
        inline bool operator()(const std::shared_ptr<Rect2D> &ptr1, const std::shared_ptr<Rect2D> &ptr2) const
        {
            if (ptr1->getCenterPosition2d().y < ptr2->getCenterPosition2d().y)
            {
                return true;
            }
            else if (ptr1->getCenterPosition2d().y > ptr2->getCenterPosition2d().y)
            {
                return false;
            }

            return ptr1->getCenterPosition2d().x < ptr2->getCenterPosition2d().x;
        }
    };


    class TileUndo : public Undoable
    {
    public:
        static TileUndo createForActiveTileLayer(Document &document);

        void undo(Document &document) const override;

        void redo(Document &document) const override;

        void addTile(std::shared_ptr<Rect2D> prevRect, std::shared_ptr<Rect2D> newRect);

    private:
        TileUndo(Document &document);

        std::set<std::shared_ptr<Rect2D>, SharedPtrCompare> m_PrevList;

        std::set<std::shared_ptr<Rect2D>, SharedPtrCompare> m_NewList;

        size_t m_TileLayerPos;

        size_t m_FramePos;

        size_t m_DrawingPos;
    };

} // namespace editor
} // namespace spright
