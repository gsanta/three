#pragma once
#include "../src/app/tool/tool/pointer_info.h"
#include "../src/maths/vec2.h"

using namespace spright::maths;
using namespace spright::editor;

class PointerInfoBuilder
{
private:
    Vec2 m_Curr;
    PointerInfo m_Pointer;

public:
    PointerInfoBuilder &withPoinerInfo(const PointerInfo &);
    PointerInfoBuilder &withCurr(Vec2);
    PointerInfo build();
};
