#include "pointer_info_builder.h"

PointerInfoBuilder &PointerInfoBuilder::withCurr(Vec2 curr)
{
    m_Curr = curr;
    return *this;
}

PointerInfo PointerInfoBuilder::build()
{
    PointerInfo info;
    info.curr = m_Curr;
    return info;
}
