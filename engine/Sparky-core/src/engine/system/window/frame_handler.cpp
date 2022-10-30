#include "frame_handler.h"

namespace spright_engine { namespace system {
	void FrameHandler::emitUpdate(float deltaTime)
	{
		for (FrameListener* listener : m_Listeners) {
			listener->onUpdate(deltaTime);
		}
	}

	void FrameHandler::registerListener(FrameListener* listener)
	{
		m_Listeners.push_back(listener);
	}

	void FrameHandler::unRegisterListener(FrameListener* listener)
	{
		auto it = std::find_if(begin(m_Listeners), end(m_Listeners), [&listener](FrameListener* p) { return p == listener; });

		if (it != m_Listeners.end()) {
			m_Listeners.erase(it);
		}
	}
}}