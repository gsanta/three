#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../cursor/cursor.h"

namespace spright
{
namespace editor
{
    class RectangleCursor : public Cursor
    {
    public:
        RectangleCursor(int rectangleSize, bool shouldDisableOnDrag = false);

        void update(TileLayer &toolLayer, const PointerInfo &pointerInfo);

        virtual void destroy(TileLayer &toolLayer);

    private:
        void setPosition(TileLayer &toolLayer, const Vec2 &pos);

    private:
        int m_Size;

        Rect2D *m_Rect = nullptr;
    };
} // namespace editor
} // namespace spright
