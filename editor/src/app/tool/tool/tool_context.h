#pragma once

#include "../handler/tool_store.h"
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

        std::shared_ptr<ToolStore> tools;
    };
} // namespace editor
} // namespace spright
