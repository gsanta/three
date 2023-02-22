#pragma once

#include <nlohmann/json.hpp>

namespace spright { namespace editor {
	class EventListener {

	public:
		inline virtual void dataChange() {}
		inline virtual void onChange(nlohmann::json json) {}
	};
}}