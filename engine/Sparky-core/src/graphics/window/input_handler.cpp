#include "input_handler.h"


namespace my_app { namespace graphics {

	void InputHandler::emitMouseDown(int button)
	{
		for (InputListener* listener : this->m_Listeners) {
			listener->onMouseDown(button);
		}
	}

	void InputHandler::emitMouseUp(int button)
	{
		for (InputListener* listener : this->m_Listeners) {
			listener->onMouseUp(button);
		}

	}

	void InputHandler::registerListener(InputListener* inputListener)
	{
		this->m_Listeners.push_back(inputListener);
	}

	void InputHandler::unRegisterListener(InputListener* inputListener)
	{
		auto it = std::find_if(m_Listeners.begin(), m_Listeners.end(), [&inputListener](const InputListener* p) { return p == inputListener; });

		if (it != m_Listeners.end()) {
			this->m_Listeners.erase(it);
		}
	}
}}