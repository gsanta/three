#pragma once

#include <nlohmann/json.hpp>
#include "../src/app/service/core/event/event_listener.h"

using namespace ::spright::editor;

class TestEventListener : public EventListener {
private:
	nlohmann::json m_LastData;
	int m_EmitCount = 0;

public:
	void onChange(nlohmann::json json) override;
	nlohmann::json getLastData();
	int getEmitCount();
};