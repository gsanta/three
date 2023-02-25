#pragma once

#include <nlohmann/json.hpp>
#include <string>
#include "../src/app/service/core/event/event_emitter.h"

using namespace ::spright::editor;

class TestEventEmitter : public EventEmitter {
private:
	nlohmann::json m_LastData;
	std::string m_LastEventType;
	int m_EmitCount = 0;

public:
	void emitChange(std::string eventType, nlohmann::json json) override;
	nlohmann::json getLastData();
	std::string getLastEventType();
	int getEmitCount();
};