#pragma once

#include "../../engine/graphics/renderable/rect2d.h"
#include "tool.h"
#include "../document/document_handler.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../service/services.h"

namespace spright { namespace tool {

	using namespace document;
	using namespace ::engine::graphics;

	class RectangleTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		EventHandler* m_EventHandler;
		Services* m_Services;
		float m_Size = 10;
		Rect2D* m_Rect = nullptr;

	public:
		RectangleTool(DocumentHandler* documentHandler, Services* services, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}