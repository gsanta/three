#pragma once
#include "tool.h"
#include "pointer_info.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/renderable2d.h"
#include "../editor_config.h"
#include "../document/document_store.h"
#include "../service/core/event/event_handler.h"
#include "brush.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace spright::maths;

	class BrushTool : public Tool
	{
	private:
		DocumentStore *m_documentStore;
		EventHandler* m_EventHandler;
		int m_EraserSize = 1;
		Rect2D *sprite;
		unsigned int m_Color = 0x8f000000;
		Brush brush;

	public:
		BrushTool(DocumentStore* documentStore, EventHandler* eventHandler);

		void setSize(int size);
		unsigned int getColor() const;
		void setColor(unsigned int color);
	private:
		void pointerMove(PointerInfo& pointerInfo) override;
		void pointerDown(PointerInfo &pointerInfo) override;
		void paint(PointerInfo& pointerInfo);
	};
}}
