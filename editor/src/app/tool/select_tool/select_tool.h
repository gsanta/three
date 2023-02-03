#pragma once

#include <vector>
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document_handler.h"
#include "../tool.h"
#include "../../service/core/event/event_handler.h"
#include "selection_box.h"

namespace spright {
	using namespace document;
	using namespace ::engine::maths;
	using namespace ::engine::graphics;

	class SelectTool : public tool::Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		EventHandler* m_EventHandler;
		SelectionBox* m_SelectionBox;

		//vector<engine::graphics::Rect2D*> m_SelectionSprites;
		vector<Rect2D*> m_Data;
		vector<Vec2> m_OrigPositions;

		//float m_DashSize = 0.2f;
		float m_NoMovementTolerance = 0.1f;

		bool m_IsMove = false;

	public:
		SelectTool(DocumentHandler* documentHandler, EventHandler* eventHandler);
		void pointerDown(tool::PointerInfo& pointerInfo) override;
		void pointerUp(tool::PointerInfo& pointerInfo) override;
		void pointerMove(tool::PointerInfo& pointerInfo) override;
	private:
		//void updateSelectionBox(Vec2 bottomLeft, Vec2 topRight);
		void makeSelection(tool::PointerInfo& pointerInfo);
		void makePointSelection(tool::PointerInfo& pointerInfo);
		void moveSelection(tool::PointerInfo& pointerInfo);
	};
}