#pragma once

#include "../../core/canvas/canvas_listener.h"
#include "../../editor.h"

namespace spright { namespace feature { namespace canvas {
	using namespace ::engine::graphics;

	class CursorLight : public spright::core::CanvasListener {
	private:
		spright::Editor* m_Editor;

	public:
		CursorLight(spright::Editor* editor);
		void pointerMove(spright::tool::PointerInfo& pointerInfo) override;
	};
}}}