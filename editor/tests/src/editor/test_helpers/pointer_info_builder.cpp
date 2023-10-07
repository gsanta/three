#include "pointer_info_builder.h"

PointerInfoBuilder &PointerInfoBuilder::withCurr(Vec2 curr)
{
    m_Curr = curr;
    return *this;
}

PointerInfoBuilder &PointerInfoBuilder::with(const Vec2 &curr, const Vec2 &prev, const Vec2 &down)
{
    m_Curr = curr;
    m_Prev = prev;
    m_Down = down;

    return *this;
}


PointerInfo PointerInfoBuilder::build()
{
    m_Pointer.curr = m_Curr;
    m_Pointer.prev = m_Prev;
    m_Pointer.down = m_Down;
    return m_Pointer;
}
