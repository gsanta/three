#pragma once

#include "../src/engine/graphics/renderer/headless/headless_renderer2d.h"
#include "../src/engine/scene/canvas/canvas3d.h"
#include "../src/engine/system/utils/uuid_generator.h"
#include "../src/maths/data/bounds.h"

using namespace ::spright::engine;

class Drawing3dBuilder
{
public:
    Drawing3dBuilder &withBounds(const Bounds &bounds);

    Canvas3d build();

private:
    Bounds m_Bounds;
};
