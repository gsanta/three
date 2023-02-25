#include "emscripten_event_emitter.h"

namespace spright { namespace editor {

	void EmscriptenEventEmitter::emitChange(std::string eventType, nlohmann::json data) {
#ifdef SPARKY_EMSCRIPTEN
		emscripten::val eventHandler = emscripten::val::global("EditorEvents");
		eventHandler.call<emscripten::val>("dispatch", eventType, data.dump());
#endif
	}
}}