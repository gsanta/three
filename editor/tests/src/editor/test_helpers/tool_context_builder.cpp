#include "tool_context_builder.h"

ToolContextBuilder &ToolContextBuilder::withToolContext(ToolContext context)
{
    m_ToolContext = context;
}


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
    PointerInfo pointer = m_PointerInfo.build();
    DocumentInfo doc = m_DocInfo.build();

    m_ToolContext.pointer = pointer;
    m_ToolContext.doc = doc;

    return m_ToolContext;
}
