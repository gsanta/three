#pragma once
#include <vector>
#include <algorithm>
#include "event_listener.h"

namespace spright {

	class EventHandler {
	private:
		std::vector<EventListener*> m_Listeners;
	public:
		void emitDataChange();

		void addListener(EventListener* listener);
		void removeListener(EventListener* listener);
	};
}
