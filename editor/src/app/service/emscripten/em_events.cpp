#include "em_events.h"

namespace spright {namespace editor {
	void EmEvents::dataChange()
	{
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val eventHandler = emscripten::val::global("EditorEvents");
		eventHandler.call<emscripten::val>("emitDataChange");
#endif
	}

	void EmEvents::onChange(nlohmann::json data)
	{
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val eventHandler = emscripten::val::global("EditorListener");
		eventHandler.call<emscripten::val>("onChange", data.dump());
#endif
	}
}}
