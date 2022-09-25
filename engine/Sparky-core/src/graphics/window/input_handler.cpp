#include "input_handler.h"


namespace my_app { namespace graphics {
	InputHandler::InputHandler(Window* window) : m_Window(window)
	{
		
	}

	InputHandler::~InputHandler()
	{
	}

	void InputHandler::emitMouseDown(int button)
	{
		for (InputListener* listener : m_Listeners) {
			listener->onMouseDown(button);
		}
	}

	void InputHandler::emitMouseUp(int button)
	{
		for (InputListener* listener : m_Listeners) {
			listener->onMouseUp(button);
		}
	}

	void InputHandler::emitMouseMove(double x, double y)
	{
		std::cout << "X: " << x << std::endl;
		for (InputListener* listener : m_Listeners) {
			double xPos = x * 32.0f / m_Window->getWidth() - 16.0f;
			double yPos = 9.0f - y * 18.0f / m_Window->getHeight();
			listener->onMouseMove(xPos, yPos);
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