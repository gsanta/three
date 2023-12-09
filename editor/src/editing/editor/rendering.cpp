#include "rendering.h"

namespace spright
{
Rendering::Rendering(Window *window, DocumentStore *documentStore)
    : m_Window(window), m_DocumentStore(documentStore), m_ScreenRenderTarget(std::make_unique<DefaultRenderTarget>()),
      m_ImageRenderTarget(std::make_unique<ImageRenderTarget>(window))
{
    m_ScreenRenderTarget->enable();
}

void Rendering::render()
{
    m_Window->beforeRender();

    Document &document = m_DocumentStore->getActiveDocument();

    if (m_RenderingTarget == Rendering::Target::SCREEN)
    {
        for (int i = 0; i < document.getCanvasCount(); i++)
        {
            document.getCanvas(i)->render(*document.getBackgroundCanvas().getCamera(), Canvas::Screen);
        }
    }
    else
    {
        TileCanvas &activeDrawing = get_active_tile_canvas(document);
        activeDrawing.render(*document.getBackgroundCanvas().getCamera(), Canvas::Image);
    }

    m_Window->afterRender();
}

void Rendering::enableImageTarget()
{
    if (m_RenderingTarget != Rendering::Target::IMAGE)
    {
        m_ScreenRenderTarget->disable();
        m_ImageRenderTarget->enable();
        m_RenderingTarget = Rendering::Target::IMAGE;
    }
}

void Rendering::enableScreenTarget()
{
    if (m_RenderingTarget != Rendering::Target::SCREEN)
    {
        m_ImageRenderTarget->disable();
        m_ScreenRenderTarget->enable();
        m_RenderingTarget = Rendering::Target::SCREEN;
    }
}
} // namespace spright
