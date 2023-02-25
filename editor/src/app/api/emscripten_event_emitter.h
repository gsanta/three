#pragma once

#include "../service/core/event/event_emitter.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/val.h>
#endif

namespace spright { namespace editor {

	class EmscriptenEventEmitter : public EventEmitter {
	public:
		void emitChange(std::string eventType, nlohmann::json data) override;
	};
}}