#pragma once

#include "../../engine/graphics/renderable/bounds.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    class DrawingState
    {
    public:
        Bounds getBounds();

        void setBounds(Bounds bounds);

        void clearBounds();

    private:
        Bounds m_Bounds;
    };
} // namespace editor
} // namespace spright
