#pragma once
#include "../src/app/core/history/document_history.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../src/engine/structure/canvas.h"
#include "../src/engine/system/utils/uuid_generator.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "drawing_builder.h"

#include <vector>

class DocumentStoreBuilder
{
private:
    vector<DrawingBuilder> m_Drawings;
    Bounds m_DocumentBounds = Bounds::createWithPositions(-32.0f / 2.0f, -32.0f / 2.0f, 32.0f / 2.0f, 32.0f / 2.0f);
    HeadlessWindow m_Window;

public:
    DocumentStoreBuilder();
    DocumentStoreBuilder &withWindowSize(int windowSize);
    DocumentStoreBuilder &withDocumentBounds(Bounds bounds);
    DocumentStoreBuilder &withDrawing(DrawingBuilder builder);
    DocumentStoreBuilder &withDrawing();
    DocumentStore build();
};
