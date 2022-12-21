#pragma once

#include <vector>
#include "../../engine/graphics/renderable/sprite.h"
#include "../document/document_handler.h"
#include "tool.h"
#include "../service/core/event/event_handler.h"

namespace spright { namespace tool {
	using namespace spright::maths;
	using namespace document;

	class EraseTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		EventHandler* m_EventHandler;
		vector<engine::graphics::Sprite*> m_SelectionSprites;

		float m_DashSize = 0.2f;
		bool m_IsMoveSelection = false;

	public:
		EraseTool(DocumentHandler* documentHandler, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	private:
		void select(PointerInfo& pointerInfo);
		void move(PointerInfo& pointerInfo);
	};
}}