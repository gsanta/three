#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../tool/tool_context.h"

namespace spright
{
namespace editor
{
    class Cursor
    {
    public:
        Cursor(bool shouldDisableOnDrag = false);

        virtual void update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo);

        virtual void destroy(TileLayer &foregroundLayer);

        void setDisabled(bool isDisabled, TileLayer &foregroundLayer);

        bool isDisabled() const;

        bool shouldDisableOnDrag() const;

    private:
        bool m_IsDisabled = false;

        bool m_DisableOnDrag = false;
    };
} // namespace editor
} // namespace spright
