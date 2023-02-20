#pragma once

#include "../../engine/graphics/renderable/rect2d.h"
#include "tool.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../service/services.h"
#include "../document/document_store.h"

namespace spright { namespace editor {

	using namespace ::spright::engine;

	class RectangleTool : public Tool {
	private:
		DocumentStore* m_DocumentStore;
		EventHandler* m_EventHandler;
		Services* m_Services;
		float m_EraserSize = 10;
		Rect2D* m_Rect = nullptr;

	public:
		RectangleTool(DocumentStore* documentStore, Services* services, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		void pointerUp(PointerInfo& pointerInfo) override;
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}