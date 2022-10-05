#include "cursor_light.h"

namespace my_app_editor { namespace feature { namespace canvas {
	CursorLight::CursorLight(my_app::editor::Editor* editor) : m_Editor(editor)
	{
	}

	void CursorLight::pointerMove(my_app::editor::tool::PointerInfo& pointerInfo) {
		my_app::maths::Vec2 lightPos = m_Editor->getWindow()->getInputHandler()->screenToCanvasPos(pointerInfo.curr);
		m_Editor->getDocumentHandler()->getActiveDocument()->getActiveLayer()->getShader()->enable();
		m_Editor->getDocumentHandler()->getActiveDocument()->getActiveLayer()->getShader()->setUniform2f("light_pos", pointerInfo.curr);
		m_Editor->getDocumentHandler()->getActiveDocument()->getActiveLayer()->getShader()->disable();
	}
}}}