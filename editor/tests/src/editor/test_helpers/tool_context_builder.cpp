#include "tool_context_builder.h"

ToolContextBuilder &ToolContextBuilder::withDocumentInfo(DocumentInfoBuilder builder)
{
    m_DocInfo = builder;
    return *this;
}

ToolContextBuilder &ToolContextBuilder::withPointerInfo(PointerInfoBuilder builder)
{
    m_PointerInfo = builder;
    return *this;
}

ToolContext ToolContextBuilder::build()
{
    ToolContext context;
    context.pointer = m_PointerInfo.build();
    context.doc = m_DocInfo.build();
    return context;
}
