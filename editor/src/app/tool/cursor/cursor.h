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
        virtual void update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo);

        virtual void destroy(TileLayer &foregroundLayer);
    };
} // namespace editor
} // namespace spright
