#pragma once

#include "../src/app/document/drawing.h"
#include "../src/app/tool/tool/document_info.h"

using namespace ::spright::editor;

class DocumentInfoBuilder
{
private:
    Drawing *m_ActiveDrawing = nullptr;

public:
    DocumentInfoBuilder &withActiveDrawing(Drawing *);

    DocumentInfo build();
};
