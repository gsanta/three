#pragma once

#include "../../core/canvas/canvas_listener.h"
#include "../../editor.h"

namespace my_app_editor { namespace feature { namespace canvas {

	class CursorLight : public my_app_editor::core::CanvasListener {
	private:
		my_app_editor::Editor* m_Editor;

	public:
		CursorLight(my_app_editor::Editor* editor);
		void pointerMove(my_app_editor::tool::PointerInfo& pointerInfo) override;
	};
}}}