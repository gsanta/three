#pragma once
#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../maths/vec2_int.h"

namespace spright
{
namespace editor
{
    using namespace spright::maths;
    using namespace spright::engine;

    using onRect2DErase = std::function<void(std::shared_ptr<Rect2D>)>;

    inline void defaultOnRect2DErase(std::shared_ptr<Rect2D> prev)
    {
    }

    class Eraser
    {
    public:
        void erase(TileLayer &layer,
                   const Vec2Int &vec2,
                   int eraserSize,
                   onRect2DErase callback = defaultOnRect2DErase);
    };
} // namespace editor
} // namespace spright
