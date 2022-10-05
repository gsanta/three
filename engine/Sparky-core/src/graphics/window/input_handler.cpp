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

	my_app::maths::Vec2 InputHandler::screenToCanvasPos(my_app::maths::Vec2 screenPos)
	{
		float xPos = (screenPos.x + 16.0f) * m_Window->getWidth() / 32.0f;
		float yPos = (9.0f - screenPos.y) * m_Window->getHeight() / 18.0f;

		return my_app::maths::Vec2(xPos, yPos);
 	}
}}