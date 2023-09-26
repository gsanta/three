#include "tool_context_builder.h"


ToolContextBuilder &ToolContextBuilder::withDocumentInfo(DocumentInfoBuilder builder)
{
    m_DocInfo = builder;
    return *this;
}

ToolContextBuilder &ToolContextBuilder::withDocument(Document &document)
{
    m_Document = &document;
    return *this;
}

ToolContextBuilder &ToolContextBuilder::withPointerInfo(PointerInfoBuilder builder)
{
    m_PointerInfo = builder;
    return *this;
}

ToolContextBuilder &ToolContextBuilder::withActiveDrawing(DocumentStore &documentStore)
{
    Drawing &activeDrawing = documentStore.getActiveDocument().getDrawings()[0];

    return withDocumentInfo(
        DocumentInfoBuilder().withActiveDrawing(&activeDrawing).withDocument(&documentStore.getActiveDocument()));
}


ToolContext ToolContextBuilder::build()
{
    ToolContext toolContext;

    PointerInfo pointer = m_PointerInfo.build();

    DocumentInfo doc = m_DocInfo.build();

    if (m_Document)
    {
        doc.document = m_Document;
        doc.activeDrawing = &m_Document->getActiveDrawing();
    }

    toolContext.pointer = pointer;
    toolContext.doc = doc;

    return toolContext;
}
