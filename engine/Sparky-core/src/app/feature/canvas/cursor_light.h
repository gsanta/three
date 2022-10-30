#pragma once

#include "../../core/canvas/canvas_listener.h"
#include "../../editor.h"

namespace spright_app { namespace feature { namespace canvas {

	class CursorLight : public spright_app::core::CanvasListener {
	private:
		spright_app::Editor* m_Editor;

	public:
		CursorLight(spright_app::Editor* editor);
		void pointerMove(spright_app::tool::PointerInfo& pointerInfo) override;
	};
}}}