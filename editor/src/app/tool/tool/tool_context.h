#pragma once

#include "../../editor/editor_state.h"
#include "document_info.h"
#include "pointer_info.h"

#include <utility>

namespace spright
{
namespace editor
{

    struct ToolContext
    {
        PointerInfo pointer;

        DocumentInfo doc;

        std::shared_ptr<EditorState> editorState;

        explicit ToolContext(std::shared_ptr<EditorState>);
    };
} // namespace editor
} // namespace spright
