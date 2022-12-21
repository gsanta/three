#include "cursor_light.h"

namespace spright { namespace feature { namespace canvas {
	CursorLight::CursorLight(spright::Editor* editor) : m_Editor(editor)
	{
	}

	void CursorLight::pointerMove(spright::tool::PointerInfo& pointerInfo) {
		engine::maths::Vec2 lightPos = m_Editor->getWindow()->getInputHandler()->screenToCanvasPos(pointerInfo.curr);
		engine::graphics::Layer* backgroundLayer = m_Editor->getDocumentHandler()->getActiveDocument()->getLayer(spright::document::DEFAULT_BACKGROUND_LAYER_ID);
		backgroundLayer->getShader()->enable();
		backgroundLayer->getShader()->setUniform2f("light_pos", pointerInfo.curr);
		backgroundLayer->getShader()->disable();
	}
}}}