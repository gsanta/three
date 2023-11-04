#include "./canvas.h"

namespace spright
{
namespace engine
{
    Canvas::Canvas(const std::string &uuid, const Bounds &bounds, const Layer &decorationLayer)
        : m_Uuid(uuid), m_Bounds(bounds), m_DecorationLayer(decorationLayer)
    {
    }

    const Bounds &Canvas::getBounds() const
    {
        return m_Bounds;
    }

    const std::string Canvas::getUuid() const
    {
        return m_Uuid;
    }

    Canvas *Canvas::clone() const
    {
        return new Canvas(m_Uuid, m_Bounds, m_DecorationLayer);
    }

    void Canvas::render(const Camera &camera, Canvas::RenderTarget target)
    {
    }

    Layer &Canvas::getDecorationLayer()
    {
        return m_DecorationLayer;
    }
} // namespace engine
} // namespace spright
