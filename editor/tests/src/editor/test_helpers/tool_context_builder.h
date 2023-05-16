#pragma once
#include "../src/app/tool/tool/tool_context.h"
#include "document_info_builder.h"
#include "pointer_info_builder.h"

class ToolContextBuilder
{
public:
    ToolContextBuilder &withDocumentInfo(DocumentInfoBuilder builder);

    ToolContextBuilder &withPointerInfo(PointerInfoBuilder builder);

    ToolContextBuilder &withActiveDrawing(DocumentStore &documentStore);

    ToolContext build();

private:
    DocumentInfoBuilder m_DocInfo;

    PointerInfoBuilder m_PointerInfo;
};
