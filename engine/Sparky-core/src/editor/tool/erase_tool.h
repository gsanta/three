#pragma once

#include <vector>
#include "../../graphics/sprite.h"
#include "../document/document_handler.h"
#include "tool.h"

namespace my_app { namespace editor { namespace tool {

	using namespace document;
	using namespace my_app::graphics;

	class EraseTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		vector<my_app::graphics::Sprite*> sprites;

		float m_DashSize = 0.2f;

	public:
		EraseTool(DocumentHandler* documentHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}}