#pragma once
#include "../src/app/tool/tool/pointer_info.h"
#include "../src/maths/vec2.h"

using namespace spright::maths;
using namespace spright::editor;

class PointerInfoBuilder
{
public:
    PointerInfoBuilder &withPoinerInfo(const PointerInfo &);

    PointerInfoBuilder &withCurr(Vec2);

    PointerInfoBuilder &with(const Vec2 &curr, const Vec2 &prev, const Vec2 &down);

    PointerInfo build();

private:
    Vec2 m_Curr;

    Vec2 m_Prev;

    Vec2 m_Down;

    PointerInfo m_Pointer;
};
