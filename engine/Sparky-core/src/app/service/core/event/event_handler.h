#pragma once
#include <vector>
#include "event_listener.h"

namespace spright_app {

	class EventHandler {
	private:
		std::vector<EventListener*> m_Listeners;
	public:
		void emitDataChange();

		void addListener(EventListener* listener);
		void removeListener(EventListener* listener);
	};

}