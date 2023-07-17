#include "target_renderer.h"

namespace spright
{
namespace editor
{
    TargetRenderer::TargetRenderer(DocumentStore *documentStore) : m_DocumentStore(documentStore)
    {
    }

    void TargetRenderer::enable()
    {
        m_RenderTarget->enable();
    }

    void TargetRenderer::disable()
    {
        m_RenderTarget->disable();
    }
} // namespace editor
} // namespace spright
