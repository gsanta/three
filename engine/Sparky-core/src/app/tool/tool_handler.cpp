#include "tool_handler.h"

namespace spright_app { namespace tool {
	ToolHandler::ToolHandler()
	{
	}

	ToolHandler::ToolHandler(spright_engine::system::Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig) : m_Window(window), m_EditorConfig(editorConfig)
	{
		window->getInputHandler()->registerListener(this);
		m_ActiveTools = new vector<Tool*>();
	}

	ToolHandler::~ToolHandler() {}

	ToolHandler& ToolHandler::operator=(const ToolHandler& toolHandler)
	{
		m_Window = toolHandler.m_Window;
		tools = toolHandler.tools;
		m_ActiveTools = toolHandler.m_ActiveTools;
		m_EditorConfig = toolHandler.m_EditorConfig;

		m_Window->getInputHandler()->registerListener(this);

		return *this;
	}

	void ToolHandler::onMouseUp(bool buttons[3]) {

		for (Tool* tool : *m_ActiveTools) {
			this->m_pointerInfo.buttons[0] = buttons[0];
			this->m_pointerInfo.buttons[1] = buttons[1];
			this->m_pointerInfo.buttons[2] = buttons[2];
			tool->pointerUp(this->m_pointerInfo);
			this->m_pointerInfo.isDown = false;
		}
	}

	void ToolHandler::onMouseDown(bool buttons[3])
	{
		this->m_pointerInfo.isDown = true;
		this->m_pointerInfo.down.x = this->m_pointerInfo.curr.x;
		this->m_pointerInfo.down.y = this->m_pointerInfo.curr.y;
		this->m_pointerInfo.buttons[0] = buttons[0];
		this->m_pointerInfo.buttons[1] = buttons[1];
		this->m_pointerInfo.buttons[2] = buttons[2];
		
		for (Tool* tool : *m_ActiveTools) {
			tool->pointerDown(this->m_pointerInfo);
		}
	}


	void ToolHandler::onMouseMove(double x, double y)
	{
		this->m_pointerInfo.prev.x = m_pointerInfo.curr.x;
		this->m_pointerInfo.prev.y = m_pointerInfo.curr.y;
		this->m_pointerInfo.curr.x = x;
		this->m_pointerInfo.curr.y = y;
		
		for (Tool* tool : *m_ActiveTools) {
			tool->pointerMove(this->m_pointerInfo);
		}
	}

	void ToolHandler::onScroll(double x, double y)
	{
		m_pointerInfo.scroll.x = x;
		m_pointerInfo.scroll.y = y;

		for (Tool* tool : *m_ActiveTools) {
			tool->scroll(this->m_pointerInfo);
		}
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

