#include "input_handler.h"


namespace engine { namespace system {
	InputHandler::InputHandler(Window* window) : m_Window(window)
	{
		
	}

	InputHandler::~InputHandler()
	{
	}

	void InputHandler::emitMouseDown(bool buttons[3])
	{
		for (InputListener* listener : m_Listeners) {
			listener->onMouseDown(buttons);
		}
	}

	void InputHandler::emitMouseUp(bool buttons[3])
	{
		for (InputListener* listener : m_Listeners) {
			listener->onMouseUp(buttons);
		}
	}

	void InputHandler::emitMouseMove(double x, double y)
	{
		for (InputListener* listener : m_Listeners) {
			double xPos = x * 32.0f / m_Window->getWidth() - 16.0f;
			double yPos = 9.0f - y * 18.0f / m_Window->getHeight();
			listener->onMouseMove(xPos, yPos);
		}
	}

	void InputHandler::emitScroll(double x, double y)
	{
		for (InputListener* listener : m_Listeners) {
			listener->onScroll(x, y);
		}
	}

	void InputHandler::emitKeyChange(int key, bool isPressed)
	{
		for (InputListener* listener : m_Listeners) {
			listener->onKeyChange(key, isPressed);
		}
	}

	void InputHandler::registerListener(InputListener* inputListener)
	{
		m_Listeners.push_back(inputListener);
	}

	void InputHandler::unRegisterListener(InputListener* inputListener)
	{
		auto it = std::find_if(begin(m_Listeners), end(m_Listeners), [](InputListener* p) { 
			return true; 
		});

		if (it != m_Listeners.end()) {
			m_Listeners.erase(it);
		}
	}

	Vec2 InputHandler::screenToCanvasPos(Vec2 screenPos)
	{
		float xPos = (screenPos.x + 16.0f) * m_Window->getWidth() / 32.0f;
		float yPos = (9.0f - screenPos.y) * m_Window->getHeight() / 18.0f;

		return Vec2(xPos, yPos);
 	}
}}