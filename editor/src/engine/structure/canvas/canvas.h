#pragma once
#include "../../graphics/layer/layer.h"
#include "../../graphics/renderable/bounds.h"

namespace spright
{
namespace engine
{
    class Canvas
    {
    public:
        Canvas(const Bounds &bounds, const Layer &decorationLayer);

        const Bounds &getBounds() const;

        Layer &getDecorationLayer();

    private:
        Bounds m_Bounds;

        Layer m_DecorationLayer;
    };
} // namespace engine
} // namespace spright
