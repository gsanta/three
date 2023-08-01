
#include "document_info_builder.h"

DocumentInfoBuilder &DocumentInfoBuilder::withActiveDrawing(Drawing *drawing)
{
    m_ActiveDrawing = drawing;
    return *this;
}

DocumentInfoBuilder &DocumentInfoBuilder::withDocument(Document *document)
{
    m_Document = document;

    return *this;
}


DocumentInfo DocumentInfoBuilder::build()
{
    DocumentInfo docInfo;
    docInfo.activeDrawing = m_ActiveDrawing;
    docInfo.document = m_Document;
    docInfo.setActiveDocumentChanging(false);
    return docInfo;
}
