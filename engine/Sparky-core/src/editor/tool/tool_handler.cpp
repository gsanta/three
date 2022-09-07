#include "tool_handler.h"

namespace my_app { namespace editor { namespace tool {
	
	ToolHandler::ToolHandler(Window* window, DocumentHandler* documentHandler) : m_Window(window)
	{
		window->getInputHandler()->registerListener(this);

		this->tools.push_back(new BrushTool(documentHandler));
		this->m_ActiveTool = this->getTool("brush_tool");
	}

	void ToolHandler::onMouseUp(int button) {
		this->m_ActiveTool->pointerUp();
	}

	void ToolHandler::onMouseDown(int button)
	{
		this->m_ActiveTool->pointerDown();
	}

	Tool* ToolHandler::getTool(string name) const
	{
		auto it = find_if(this->tools.begin(), this->tools.end(), [&name](const Tool* tool) { return tool->getName() == name; });
	
		return *it;
	}

} } }

