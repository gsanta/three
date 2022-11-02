#pragma once
#include "../core/event/event_handler.h"
#include "em_events.h"

namespace spright_app {

	class EmService {
	private:
#ifdef SPARKY_EMSCRIPTEN
		EmEvents* m_EmEvents;
#endif
	public:
		EmService(EventHandler* eventHandler);
		~EmService();
	};
}