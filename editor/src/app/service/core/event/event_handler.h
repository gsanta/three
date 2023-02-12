#pragma once
#include <vector>
#include <algorithm>
#include "event_listener.h"

namespace spright { namespace editor {

	class EventHandler {
	private:
		std::vector<EventListener*> m_Listeners;
	public:
		void emitDataChange();

		void addListener(EventListener* listener);
		void removeListener(EventListener* listener);
	};
}}
