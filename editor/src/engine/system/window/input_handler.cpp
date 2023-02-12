#include "input_handler.h"


namespace spright { namespace engine {
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
			listener->onMouseMove(x, y);
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
}}