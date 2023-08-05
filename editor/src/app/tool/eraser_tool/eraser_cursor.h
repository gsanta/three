#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../cursor/cursor.h"
#include "./eraser_stroke.h"

namespace spright
{
namespace editor
{
    class EraserCursor : public Cursor
    {
    public:
        EraserCursor(int eraserSize);

        void update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo);

        virtual void destroy(TileLayer &foregroundLayer);

        EraserStroke &getEraserStroke();

    private:
        EraserStroke m_EraserStroke;
    };
} // namespace editor
} // namespace spright
