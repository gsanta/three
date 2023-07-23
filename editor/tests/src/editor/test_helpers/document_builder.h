#pragma once
#include "../src/engine/graphics/renderable/bounds.h"
#include "drawing_builder.h"

#include <vector>

class DocumentBuilder
{
private:
    Bounds m_DocumentBounds = Bounds::createWithPositions(-32.0f / 2.0f, -32.0f / 2.0f, 32.0f / 2.0f, 32.0f / 2.0f);
    int m_WindowSize = 500;

public:
    Document build();
};