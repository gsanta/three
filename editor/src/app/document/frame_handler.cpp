#include "frame_handler.h"

namespace spright { namespace editor {
	void FrameHandler::addFrame(const Frame& frame)
	{
		int index = m_Frames.size();
		m_Frames.push_back(frame);
		m_Frames.back().setIndex(index);
	}
	
	void FrameHandler::setActiveFrame(size_t index)
	{
		if (index >= m_Frames.size()) {
			throw std::invalid_argument("No frame at index " + std::to_string(index));
		}
		m_ActiveFrame = std::make_shared<ActiveFrame>(m_Frames[index]);
	}

	Frame& FrameHandler::getFrame(size_t index)
	{
		auto it = find_if(m_Frames.begin(), m_Frames.end(), [=](Frame& frame) { return frame.getIndex() == index; });

		if (it != m_Frames.end()) {
			return *it;
		}

		throw std::invalid_argument("Frame with index " + std::to_string(index) + " not found");
	}

	std::shared_ptr<ActiveFrame> FrameHandler::getActiveFrame() {
		return m_ActiveFrame;
	}

}}
