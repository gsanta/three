#include "event_emitter.h"

namespace spright { namespace editor {
	void EventEmitter::emitChange(std::string eventType, nlohmann::json data)
	{
		for (EventListener* listener : m_Listeners) {
			listener->onChange(data);
		}
	}
}}