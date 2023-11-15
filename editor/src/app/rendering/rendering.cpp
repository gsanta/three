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
        for (std::unique_ptr<Canvas> &canvas : document.getCanvases())
        {
            canvas->render(*document.getBackgroundCanvas().getCamera(), Canvas::Screen);
        }
    }
    else
    {
        Drawing *activeDrawing = document.getActiveDrawing();
        if (activeDrawing != nullptr)
        {
            activeDrawing->render(*document.getBackgroundCanvas().getCamera(), Canvas::Image);
        }
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
