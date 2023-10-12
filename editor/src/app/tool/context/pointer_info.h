#pragma once

#include "../../../maths/vec2.h"

namespace spright
{
namespace editor
{
    using namespace maths;

    struct PointerInfo
    {
        bool buttons[3];

        bool isDown = false;

        Vec2 prev;

        Vec2 curr;

        Vec2 down;

        Vec2 scroll;

    public:
        PointerInfo();

        bool isLeftButtonDown() const;

        bool isRightButtonDown() const;

        bool isMiddleButtonDown() const;

        Vec2 downDelta() const;
    };
} // namespace editor
} // namespace spright
