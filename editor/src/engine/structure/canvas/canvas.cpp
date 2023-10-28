#include "./canvas.h"

namespace spright
{
namespace engine
{
    Canvas::Canvas(const Bounds &bounds, const Layer &decorationLayer)
        : m_Bounds(bounds), m_DecorationLayer(decorationLayer)
    {
    }

    const Bounds &Canvas::getBounds() const
    {
        return m_Bounds;
    }

    Layer &Canvas::getDecorationLayer()
    {
        return m_DecorationLayer;
    }
} // namespace engine
} // namespace spright
