#pragma once
#include <vector>
#include <algorithm>
#include <nlohmann/json.hpp>

namespace spright { namespace editor {

	class EventEmitter {
	public:
		inline virtual ~EventEmitter() {}
		virtual void emitChange(std::string eventType, nlohmann::json data) = 0;
	};
}}
