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
#include "eraser_stroke.h"

namespace spright { namespace editor {
	using namespace spright::maths;
	using namespace spright::engine;

	class EraseTool : public Tool {
	private:
		unique_ptr<LayerProvider> m_LayerProvider;

		Eraser m_Eraser;
		EraserStroke m_EraserStroke;

		int m_Size = 3;

		float m_DashSize = 0.2f;
		bool m_IsMoveSelection = false;

		float m_NoMovementTolerance = 0.1f;

	public:
		EraseTool(LayerProvider* m_LayerProvider);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
		void deactivate() override;
		void setOptions(std::string json);
		std::string getOptions();
	};
}}