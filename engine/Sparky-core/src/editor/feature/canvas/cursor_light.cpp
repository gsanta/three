#include "cursor_light.h"

namespace my_app_editor { namespace feature { namespace canvas {
	CursorLight::CursorLight(my_app_editor::Editor* editor) : m_Editor(editor)
	{
	}

	void CursorLight::pointerMove(my_app_editor::tool::PointerInfo& pointerInfo) {
		my_app_engine::maths::Vec2 lightPos = m_Editor->getWindow()->getInputHandler()->screenToCanvasPos(pointerInfo.curr);
		my_app_engine::graphics::Layer* backgroundLayer = m_Editor->getDocumentHandler()->getActiveDocument()->getLayer(my_app_editor::document::DEFAULT_BACKGROUND_LAYER_ID);
		backgroundLayer->getShader()->enable();
		backgroundLayer->getShader()->setUniform2f("light_pos", pointerInfo.curr);
		backgroundLayer->getShader()->disable();
	}
}}}