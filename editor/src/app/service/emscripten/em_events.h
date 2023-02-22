#pragma once

#include <nlohmann/json.hpp>
#include "../core/event/event_listener.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/val.h>
#endif

namespace spright { namespace editor {
	class EmEvents : public EventListener {

	public:
		void dataChange() override;
		void onChange(nlohmann::json data) override;
	};
}}

