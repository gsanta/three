#pragma once
#include <vector>
#include "../src/engine/graphics/renderable/bounds.h"
#include "drawing_builder.h"

class DocumentStoreBuilder {
private:
	vector<DrawingBuilder> m_Drawings;
	Bounds m_DocumentBounds = Bounds::createWithPositions(-32.0f / 2.0f, 32.0f / 2.0f, -32.0f / 2.0f, 32.0f / 2.0f);
	int m_WindowSize = 500;
public:
	DocumentStoreBuilder& withWindowSize(int windowSize);
	DocumentStoreBuilder& withDocumentBounds(Bounds bounds);
	DocumentStoreBuilder& withDrawing(DrawingBuilder builder);
	DocumentStoreBuilder& withDrawing();
	DocumentStore build();
};
