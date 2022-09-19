#include "tool_handler.h"

namespace my_app { namespace editor { namespace tool {
	
	ToolHandler::ToolHandler(Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig) : m_Window(window), m_EditorConfig(editorConfig)
	{
		window->getInputHandler()->registerListener(this);

		this->tools.push_back(new BrushTool(documentHandler, editorConfig));
		this->tools.push_back(new RectangleTool(documentHandler));
		// this->tools.push_back(new EraseTool(documentHandler));
		this->m_ActiveTool = this->getTool("brush");
	}

	void ToolHandler::onMouseUp(int button) {
		this->m_ActiveTool->pointerUp(this->m_pointerInfo);
		this->m_pointerInfo.isDown = false;
	}

	void ToolHandler::onMouseDown(int button)
	{
		this->m_pointerInfo.isDown = true;
		this->m_pointerInfo.down.x = this->m_pointerInfo.curr.x;
		this->m_pointerInfo.down.y = this->m_pointerInfo.curr.y;
		this->m_ActiveTool->pointerDown(this->m_pointerInfo);
	}

	void ToolHandler::onMouseMove(double x, double y)
	{
		this->m_pointerInfo.curr.x = x;
		this->m_pointerInfo.curr.y = y;
		this->m_ActiveTool->pointerMove(this->m_pointerInfo);
	}

	Tool* ToolHandler::getTool(string name) const
	{
		auto it = find_if(this->tools.begin(), this->tools.end(), [&name](const Tool* tool) { return tool->getName() == name; });
	
		return *it;
	}

} } }

