#pragma once

#include <vector>
#include "../../../engine/graphics/renderable/sprite.h"
#include "../../document/document_handler.h"
#include "../../model/rectangle.h"

namespace spright_app {
	using namespace document;
	using namespace spright_engine::maths;
	using namespace spright_engine::graphics;

	class SelectionBox {
	private:
		DocumentHandler* m_DocumentHandler;
		vector<spright_engine::graphics::Sprite*> m_SelectionSprites;

		float m_DashSize = 0.2f;

		Vec2 m_Start;

		Rectangle m_Rect;
	public:
		SelectionBox(DocumentHandler* ocumentHandler);
		~SelectionBox();
		void start(Vec2 pos);
		void update(Vec2 pos);
		void move(Vec2 delta);
		void clear();
		bool isInsideSelection(Vec2 point);
	private:
		void calcSelectionBounds(Vec2 vec1, Vec2 vec2);
		void clearSprites();
	};
}