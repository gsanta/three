#include "frame_handler.h"

namespace spright { namespace editor {
	void FrameHandler::addFrame(const Frame& frame)
	{
		m_Frames.push_back(frame);
	}
	
	void FrameHandler::setActiveFrame(const Frame& frame)
	{
		//m_ActiveFrame = &getFrame(frame.getIndex());
	}

	Frame& FrameHandler::getFrame(size_t index)
	{
		auto it = find_if(m_Frames.begin(), m_Frames.end(), [=](Frame& frame) { return frame.getIndex() == index; });

		if (it != m_Frames.end()) {
			return *it;
		}

		throw std::invalid_argument("Frame with index " + std::to_string(index) + " not found");
	}
}}
