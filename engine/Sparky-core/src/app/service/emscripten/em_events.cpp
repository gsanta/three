#include "em_events.h"

namespace spright_app
{
	void EmEvents::dataChange()
	{
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val CanvasEventHandler = emscripten::val::global("CanvasEventHandler");
		CanvasEventHandler.call<emscripten::val>("emitDataChange");
#endif
	}
}
