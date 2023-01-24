#include "em_service.h"

namespace spright {
	EmService::EmService(EventHandler* eventHandler)
	{
#ifdef SPARKY_EMSCRIPTEN
		m_EmEvents = new EmEvents();
		eventHandler->addListener(m_EmEvents);
#endif
	}

	EmService::~EmService() {
#ifdef SPARKY_EMSCRIPTEN
		delete m_EmEvents;
#endif
	}
}