#pragma once

#include <vector>
#include "../../graphics/sprite.h"
#include "../document/document_handler.h"
#include "tool.h"

namespace my_app { namespace editor { namespace tool {

	using namespace document;
	using namespace sparky::graphics;

	class EraseTool : public Tool {

		DocumentHandler* m_DocumentHandler;
		vector<sparky::graphics::Sprite*> sprites;

	public:
		EraseTool(DocumentHandler* documentHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}}