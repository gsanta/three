#include "pan_tool.h"

namespace spright
{
namespace editor
{
    PanTool::PanTool(DocumentStore *documentStore) : m_DocumentStore(documentStore), Tool("pan")
    {
    }

    void PanTool::pointerMove(const ToolContext &context)
    {
        if (context.pointer.isDown)
        {
            m_DocumentStore->getActiveDocument().getCamera().translate2D(context.pointer.prev - context.pointer.curr);
        }
    }
} // namespace editor
} // namespace spright
