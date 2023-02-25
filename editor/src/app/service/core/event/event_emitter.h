#pragma once
#include <vector>
#include <algorithm>
#include "event_listener.h"
#include <nlohmann/json.hpp>

namespace spright { namespace editor {

	class EventEmitter {
	private:
		std::vector<EventListener*> m_Listeners;
	public:
		virtual void emitChange(std::string eventType, nlohmann::json data) = 0;
	};
}}
