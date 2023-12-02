#pragma once

#include "../../../engine/scene/containers/tile_layer.h"
#include "../context/tool_context.h"

namespace spright
{
namespace editing
{
    class Cursor
    {
    public:
        Cursor(bool shouldDisableOnDrag = false);

        virtual void update(ToolContext &context);

        virtual void destroy(ToolContext &context);

        void setDisabled(ToolContext &context);

        void setEnabled(ToolContext &context);

        bool isEnabled() const;

        bool shouldDisableOnDrag() const;

    private:
        bool m_IsEnabled = true;

        bool m_DisableOnDrag = false;
    };
} // namespace editing
} // namespace spright
