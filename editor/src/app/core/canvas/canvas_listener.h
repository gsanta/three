#pragma once

#include "../../tool/context/pointer_info.h"

namespace spright
{
namespace editor
{
    class CanvasListener
    {
    public:
        inline virtual void pointerDown(PointerInfo &pointerInfo)
        {
        }
        inline virtual void pointerUp(PointerInfo &pointerInfo)
        {
        }
        inline virtual void pointerMove(PointerInfo &pointerInfo)
        {
        }
    };
} // namespace editor
} // namespace spright
