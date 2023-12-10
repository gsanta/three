#pragma once

#include "../src/editing/event/event_emitter.h"

#include <nlohmann/json.hpp>
#include <string>

using namespace spright::editing;

class TestEventEmitter : public EventEmitter
{
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
