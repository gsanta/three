#pragma once

#include <vector>
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document_store.h"
#include "../tool.h"
#include "../../service/core/event/event_handler.h"
#include "selection_box.h"

namespace spright { namespace editor {
	using namespace ::spright::maths;
	using namespace ::spright::engine;
	using namespace editor;

	class SelectTool : public Tool {
	private:
		DocumentStore* m_DocumentStore;
		EventHandler* m_EventHandler;
		SelectionBox* m_SelectionBox;

		//vector<engine::graphics::Rect2D*> m_SelectionSprites;
		vector<Rect2D*> m_Data;
		vector<Vec2> m_OrigPositions;

		//float m_DashSize = 0.2f;
		float m_NoMovementTolerance = 0.1f;

		bool m_IsMove = false;

	public:
		SelectTool(DocumentStore* documentHandler, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	private:
		//void updateSelectionBox(Vec2 bottomLeft, Vec2 topRight);
		void makeSelection(PointerInfo& pointerInfo);
		void makePointSelection(PointerInfo& pointerInfo);
		void moveSelection(PointerInfo& pointerInfo);
	};
}}