#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../maths/vec2_int.h"


namespace spright
{
namespace editor
{
    using namespace engine;
    using namespace maths;
    using onRect2DCreate = std::function<void(std::shared_ptr<Rect2D>, std::shared_ptr<Rect2D>)>;

    void defaultRect2DCreate(std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next);

    void draw_filled_rect(TileLayer &tileLayer,
                          const Bounds &bounds,
                          int color,
                          const onRect2DCreate &operation = defaultRect2DCreate);

    void draw_outlined_rect(TileLayer &tileLayer,
                            const Bounds &bounds,
                            int color,
                            const onRect2DCreate &operation = defaultRect2DCreate);

} // namespace editor
} // namespace spright
