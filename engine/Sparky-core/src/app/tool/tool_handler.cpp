#include "tool_handler.h"

namespace spright_app { namespace tool {
	
	ToolHandler::ToolHandler(spright_engine::system::Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig) : m_Window(window), m_EditorConfig(editorConfig)
	{
		window->getInputHandler()->registerListener(this);
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

	void ToolHandler::addTool(Tool* tool)
	{
		tools.push_back(tool);
	}

	Tool* ToolHandler::getTool(string name) const
	{
		auto it = find_if(this->tools.begin(), this->tools.end(), [&name](const Tool* tool) { return tool->getName() == name; });
	
		return *it;
	}

} }

