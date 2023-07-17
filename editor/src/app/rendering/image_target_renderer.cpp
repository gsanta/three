#include "image_target_renderer.h"

namespace spright
{
namespace editor
{
    ImageTargetRenderer::ImageTargetRenderer(DocumentStore *documentStore, Window *window)
        : TargetRenderer(documentStore)
    {
        m_RenderTarget = std::make_unique<ImageRenderTarget>(window);
    };

    void ImageTargetRenderer::render(Drawing &drawing)
    {
        Camera &camera = m_DocumentStore->getActiveDocument().getCamera();

        for (TileLayer &layer : drawing.getActiveFrame().getLayers())
        {
            layer.render(camera);
        }

        for (TileLayer &layer : drawing.getForegroundLayers())
        {
            layer.render(camera);
        }
    }
} // namespace editor
} // namespace spright
