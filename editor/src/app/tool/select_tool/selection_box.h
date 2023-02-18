#pragma once

#include <vector>
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../model/rectangle.h"
#include "../../document/document_store.h"

namespace spright {
	using namespace ::spright::engine;
	using namespace ::spright::editor;

	class SelectionBox {
	private:
		DocumentStore* m_DocumentStore;
		vector<Rect2D*> m_SelectionSprites;

		float m_DashSize = 0.2f;
		Vec2 m_AbsoluteDelta;
		Vec2 m_PrevTranslate;

		Vec2 m_Start;

		Rectangle m_Rect;
	public:
		SelectionBox(DocumentStore* documentStore);
		~SelectionBox();
		void start(Vec2 pos);
		void setPosition(Vec2 pos);
		void move(Vec2 delta);
		void clear();
		bool isInsideSelection(Vec2 point);
	private:
		void calcSelectionBounds(Vec2 vec1, Vec2 vec2);
		void clearSprites();
	};
}