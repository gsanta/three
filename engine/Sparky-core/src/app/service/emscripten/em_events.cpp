#include "em_events.h"

namespace spright_app {
	void EmEvents::dataChange()
	{
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val ExternalEventHandler = emscripten::val::global("ExternalEventHandler");
		ExternalEventHandler.call<emscripten::val>("emitDataChange");
#endif
	}
}
