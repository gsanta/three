#pragma once
#include "../src/editing/history/document_history.h"
#include "../src/engine/scene/cameras/camera2d.h"
#include "../src/engine/scene/canvas/canvas.h"
#include "../src/engine/system/utils/uuid_generator.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"
#include "../src/maths/data/bounds.h"
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
