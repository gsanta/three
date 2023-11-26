#pragma once

#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../src/engine/structure/drawing3d.h"
#include "../src/engine/system/utils/uuid_generator.h"

using namespace ::spright::engine;

class Drawing3dBuilder
{
public:
    Drawing3dBuilder &withBounds(const Bounds &bounds);

    Drawing3d build();

private:
    Bounds m_Bounds;
};
