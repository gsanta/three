#include "test_event_listener.h"

void TestEventListener::onChange(nlohmann::json json)
{
	m_LastData = json;
	m_EmitCount++;
}

nlohmann::json TestEventListener::getLastData()
{
	return m_LastData;
}

int TestEventListener::getEmitCount() {
	return m_EmitCount;
}