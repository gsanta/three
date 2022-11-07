#pragma once

#include "../../engine/graphics/renderable/sprite.h"
#include "tool.h"
#include "../document/document_handler.h"
#include "../../engine/maths/vec2.h"
#include "../../engine/maths/vec3.h"
#include "../service/services.h"

namespace spright_app { namespace tool {

	using namespace document;

	class RectangleTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		EventHandler* m_EventHandler;
		Services* m_Services;
		float m_Size = 10;
		spright_engine::graphics::Sprite* m_Rect = nullptr;

	public:
		RectangleTool(DocumentHandler* documentHandler, Services* services, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}