#pragma once

#include "document_info.h"
#include "pointer_info.h"

namespace spright
{
namespace editor
{

    struct ToolContext
    {
        PointerInfo pointer;
        DocumentInfo doc;
    };
} // namespace editor
} // namespace spright
