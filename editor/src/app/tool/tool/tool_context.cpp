#include "./tool_context.h"

namespace spright
{
namespace editor
{

    ToolContext::ToolContext(std::shared_ptr<EditorState> editorState) : editorState(std::move(editorState))
    {
    }
} // namespace editor
} // namespace spright
