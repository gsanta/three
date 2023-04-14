#pragma once
#include "../src/app/tool/tool/tool_context.h"
#include "document_info_builder.h"
#include "pointer_info_builder.h"

class ToolContextBuilder
{
private:
    DocumentInfoBuilder m_DocInfo;
    PointerInfoBuilder m_PointerInfo;

public:
    ToolContextBuilder &withDocumentInfo(DocumentInfoBuilder builder);
    ToolContextBuilder &withPointerInfo(PointerInfoBuilder builder);
    ToolContext build();
};
