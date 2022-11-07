#pragma once

#include <vector>
#include "../../engine/graphics/renderable/sprite.h"
#include "../document/document_handler.h"
#include "tool.h"
#include "../service/core/event/event_handler.h"

namespace spright_app {
	using namespace document;

	class SelectTool : public tool::Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		EventHandler* m_EventHandler;
		vector<spright_engine::graphics::Sprite*> m_SelectionSprites;
		vector<spright_engine::graphics::Renderable2D*> m_PixelSprites;

		float m_DashSize = 0.2f;

	public:
		SelectTool(DocumentHandler* documentHandler, EventHandler* eventHandler);
		void pointerDown(tool::PointerInfo& pointerInfo) override;
		void pointerUp(tool::PointerInfo& pointerInfo) override;
		void pointerMove(tool::PointerInfo& pointerInfo) override;
	};
}