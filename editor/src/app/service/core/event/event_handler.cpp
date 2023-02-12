#include "event_handler.h"

namespace spright { namespace editor {
	void EventHandler::emitDataChange()
	{
		for (EventListener* listener : m_Listeners) {
			listener->dataChange();
		}
	}

	void EventHandler::addListener(EventListener* listener)
	{
		m_Listeners.push_back(listener);
	}

	void EventHandler::removeListener(EventListener* listener)
	{
		auto it = find(m_Listeners.begin(), m_Listeners.end(), listener);

		if (it != m_Listeners.end()) {
			m_Listeners.erase(it);
		}
	}
}}