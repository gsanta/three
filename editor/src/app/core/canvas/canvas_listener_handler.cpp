
#include "canvas_listener_handler.h"

namespace spright { namespace editor {
	void CanvasListenerHandler::onMouseUp(bool buttons[3])
	{
		m_PointerInfo.isDown = false;
	
		for (CanvasListener* listener : m_Listeners) {
			listener->pointerUp(m_PointerInfo);
		}
	}

	void CanvasListenerHandler::onMouseDown(bool buttons[3]) {
		this->m_PointerInfo.isDown = true;
		this->m_PointerInfo.down.x = this->m_PointerInfo.curr.x;
		this->m_PointerInfo.down.y = this->m_PointerInfo.curr.y;


		for (CanvasListener* listener : m_Listeners) {
			listener->pointerDown(m_PointerInfo);
		}
	}

	void CanvasListenerHandler::onMouseMove(double x, double y)
	{
		m_PointerInfo.curr.x = x;
		m_PointerInfo.curr.y = y;

		for (CanvasListener* listener : m_Listeners) {
			listener->pointerMove(m_PointerInfo);
		}
	}

	void CanvasListenerHandler::addListener(CanvasListener* listener)
	{
		m_Listeners.push_back(listener);
	}

	void CanvasListenerHandler::removeListener(CanvasListener* listener)
	{
		auto it = find(m_Listeners.begin(), m_Listeners.end(), listener);

		if (it != m_Listeners.end()) {
			m_Listeners.erase(it);
		}
	}
}}
