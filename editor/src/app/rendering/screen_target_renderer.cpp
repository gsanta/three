#include "screen_target_renderer.h"

namespace spright
{
namespace editor
{
    ScreenTargetRenderer::ScreenTargetRenderer(DocumentStore *documentStore) : TargetRenderer(documentStore)
    {
        m_RenderTarget = std::make_unique<DefaultRenderTarget>();
    }

    void ScreenTargetRenderer::render(Drawing &drawing)
    {
        Camera &camera = m_DocumentStore->getActiveDocument().getCamera();

        drawing.getBackgroundLayer().render(camera);

        for (TileLayer &layer : drawing.getActiveFrame().getLayers())
        {
            layer.render(camera);
        }

        for (size_t i = 0; i < drawing.getTempLayerCount(); i++)
        {
            drawing.getTempLayer(i).render(camera);
        }

        drawing.getDecorationLayer().render(camera);

        drawing.getToolLayer().render(camera);

        drawing.getCursorLayer().render(camera);
    }
} // namespace editor
} // namespace spright
