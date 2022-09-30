#pragma once

#include "../../graphics/sprite.h"
#include "tool.h"
#include "../document/document_handler.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"

namespace my_app { namespace editor { namespace tool {

	using namespace document;

	class RectangleTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		float m_Size = 10;
		my_app::graphics::Sprite* m_Rect = nullptr;

	public:
		RectangleTool(DocumentHandler* documentHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};

}}}