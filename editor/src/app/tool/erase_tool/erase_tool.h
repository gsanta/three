#pragma once

#include <vector>
#include <memory>
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../engine/graphics/renderable/renderable2d.h"
#include "../../document/document_store.h"
#include "../tool.h"
#include "../../service/core/event/event_handler.h"
#include "../helper/layer_provider.h"
#include "eraser.h"

namespace spright { namespace editor {
	using namespace spright::maths;
	using namespace spright::engine;

	class EraseTool : public Tool {
	private:
		unique_ptr<LayerProvider> m_LayerProvider;
		vector<Rect2D*> m_SelectionSprites;

		Eraser m_Eraser;
		
		Rect2D* m_TopLine = nullptr;
		Rect2D* m_RightLine = nullptr;
		Rect2D* m_BottomLine = nullptr;
		Rect2D* m_LeftLine = nullptr;

		int m_Size = 2;

		float m_DashSize = 0.2f;
		bool m_IsMoveSelection = false;

		float m_NoMovementTolerance = 0.1f;

	public:
		EraseTool(LayerProvider* m_LayerProvider);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
		void activate() override;
		void deactivate() override;
		void setOptions(std::string json);
		std::string getOptions();
	private:
		void setEraserPosition(PointerInfo& pointerInfo);
		void erase(PointerInfo& pointerInfo);
	};
}}