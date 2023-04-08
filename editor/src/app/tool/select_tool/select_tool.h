#pragma once

#include <vector>
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document_store.h"
#include "../tool.h"
#include "../common/selection_box.h"

namespace spright { namespace editor {
	using namespace ::spright::maths;
	using namespace ::spright::engine;
	using namespace editor;

	class SelectTool : public Tool {
	private:
		DocumentStore* m_DocumentStore;
		SelectionBox m_SelectionBox;

		vector<Rect2D*> m_Data;
		vector<Vec2> m_OrigPositions;

		float m_NoMovementTolerance = 0.1f;
		bool m_IsMove = false;

		Drawing* m_ActiveDrawing = nullptr;

	public:
		SelectTool(DocumentStore* documentHandler);
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
