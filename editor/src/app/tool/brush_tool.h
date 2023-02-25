#pragma once
#include "tool.h"
#include "colorable.h"
#include "pointer_info.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/renderable2d.h"
#include "../editor_config.h"
#include "../document/document_store.h"
#include "brush.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace spright::maths;

	class BrushTool : public Tool, public Colorable
	{
	private:
		DocumentStore *m_documentStore;
		int m_EraserSize = 1;
		Rect2D *sprite;
		Brush brush;

	public:
		BrushTool(DocumentStore* documentStore);

		void setSize(int size);
	private:
		void pointerMove(PointerInfo& pointerInfo) override;
		void pointerDown(PointerInfo &pointerInfo) override;
		void paint(PointerInfo& pointerInfo);
	};
}}
