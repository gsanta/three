#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../maths/vec2.h"
#include "./selection_buffer.h"

#include <memory>

namespace spright
{
namespace editor
{
    using namespace engine;

    class SelectionMover
    {
    public:
        SelectionMover(std::shared_ptr<SelectionBuffer> selectionBuffer);

        Vec2 move(TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start);

        void finish(TileLayer &layer);

    private:
        std::shared_ptr<SelectionBuffer> m_SelectionBuffer;
    };
} // namespace editor
} // namespace spright
