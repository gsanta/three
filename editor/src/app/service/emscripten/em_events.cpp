#include "em_events.h"

namespace spright
{
	void EmEvents::dataChange()
	{
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val CanvasEventHandler = emscripten::val::global("EditorEvents");
		CanvasEventHandler.call<emscripten::val>("emitDataChange");
#endif
	}
}
