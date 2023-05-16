
#include "document_info_builder.h"

DocumentInfoBuilder &DocumentInfoBuilder::withActiveDrawing(Drawing *drawing)
{
    m_ActiveDrawing = drawing;
    return *this;
}

DocumentInfo DocumentInfoBuilder::build()
{
    DocumentInfo docInfo;
    docInfo.activeDrawing = m_ActiveDrawing;
    docInfo.setActiveDocumentChanging(false);
    return docInfo;
}
