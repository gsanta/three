#include "test_event_emitter.h"

void TestEventEmitter::emitChange(std::string eventType, nlohmann::json json) 
{
	m_LastEventType = eventType;
	m_LastData = json;
	m_EmitCount++;
}

nlohmann::json TestEventEmitter::getLastData()
{
	return m_LastData;
}

std::string TestEventEmitter::getLastEventType()
{
	return m_LastEventType;
}

int TestEventEmitter::getEmitCount() {
	return m_EmitCount;
}