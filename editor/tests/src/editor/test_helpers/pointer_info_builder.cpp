#include "pointer_info_builder.h"

PointerInfoBuilder &PointerInfoBuilder::withPoinerInfo(const PointerInfo &pointer)
{
    m_Pointer = pointer;
}

PointerInfoBuilder &PointerInfoBuilder::withCurr(Vec2 curr)
{
    m_Pointer.curr = curr;
    return *this;
}

PointerInfo PointerInfoBuilder::build()
{
    return m_Pointer;
}
