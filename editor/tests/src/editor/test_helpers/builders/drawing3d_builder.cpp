#include "drawing3d_builder.h"

Drawing3dBuilder &Drawing3dBuilder::withBounds(const Bounds &bounds)
{
    m_Bounds = bounds;

    return *this;
}

Drawing3d Drawing3dBuilder::build()
{
    return Drawing3d(UuidGenerator::getInstance().generate(), m_Bounds, HeadlessRenderer2D());
}
