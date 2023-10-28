#include "rendering.h"

namespace spright
{
Rendering::Rendering(Window *window, DocumentStore *documentStore) : m_Window(window), m_DocumentStore(documentStore)
{
    m_ScreenTargetRenderer = ScreenTargetRenderer(documentStore);
    m_ImageTargetRenderer = ImageTargetRenderer(documentStore, window);

    m_ScreenTargetRenderer.enable();
}

void Rendering::render()
{
    m_Window->beforeRender();

    if (m_RenderingTarget == Rendering::Target::SCREEN)
    {
        for (Drawing &drawing : m_DocumentStore->getActiveDocument().getDrawings())
        {
            m_ScreenTargetRenderer.render(drawing);
        }
    }
    else
    {
        Drawing *activeDrawing = m_DocumentStore->getActiveDocument().getActiveDrawing();
        if (activeDrawing != nullptr)
        {
            m_ImageTargetRenderer.render(*activeDrawing);
        }
    }

    m_Window->afterRender();
}

void Rendering::enableImageTarget()
{
    if (m_RenderingTarget != Rendering::Target::IMAGE)
    {
        m_ScreenTargetRenderer.disable();
        m_ImageTargetRenderer.enable();
        m_RenderingTarget = Rendering::Target::IMAGE;
    }
}

void Rendering::enableScreenTarget()
{
    if (m_RenderingTarget != Rendering::Target::SCREEN)
    {
        m_ImageTargetRenderer.disable();
        m_ScreenTargetRenderer.enable();
        m_RenderingTarget = Rendering::Target::SCREEN;
    }
}
} // namespace spright
