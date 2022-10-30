#include "cursor_light.h"

namespace spright_app { namespace feature { namespace canvas {
	CursorLight::CursorLight(spright_app::Editor* editor) : m_Editor(editor)
	{
	}

	void CursorLight::pointerMove(spright_app::tool::PointerInfo& pointerInfo) {
		spright_engine::maths::Vec2 lightPos = m_Editor->getWindow()->getInputHandler()->screenToCanvasPos(pointerInfo.curr);
		spright_engine::graphics::Layer* backgroundLayer = m_Editor->getDocumentHandler()->getActiveDocument()->getLayer(spright_app::document::DEFAULT_BACKGROUND_LAYER_ID);
		backgroundLayer->getShader()->enable();
		backgroundLayer->getShader()->setUniform2f("light_pos", pointerInfo.curr);
		backgroundLayer->getShader()->disable();
	}
}}}