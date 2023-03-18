#include "frame_store.h"

namespace spright { namespace editor {
	FrameStore::FrameStore(): m_ActiveFrame(ActiveFrame(m_Frames, 0)) {

	}


	void FrameStore::addFrame(const Frame& frame)
	{
		int index = m_Frames.size();
		m_Frames.push_back(frame);
		m_Frames.back().setIndex(index);

		if (!m_ActiveFrame.isValid()) {
			setActiveFrame(index);
		}
	}

	void FrameStore::removeFrame(size_t index) {
		if (m_Frames.size() <= 1) {
			throw "The last frame can not be removed";
		}

		m_Frames.erase(m_Frames.begin() + index);
	
		for (int i = 0; i < m_Frames.size(); i++) {
			m_Frames[i].setIndex(i);
		}

		setActiveFrame(m_Frames.size() < index ? index - 1 : index);
	}
	
	void FrameStore::setActiveFrame(size_t index)
	{
		if (index >= m_Frames.size()) {
			throw std::invalid_argument("No frame at index " + std::to_string(index));
		}

		m_ActiveFrame = ActiveFrame(m_Frames, index);
	}

	Frame& FrameStore::getFrame(size_t index)
	{
		auto it = find_if(m_Frames.begin(), m_Frames.end(), [=](Frame& frame) { return frame.getIndex() == index; });

		if (it != m_Frames.end()) {
			return *it;
		}

		throw std::invalid_argument("Frame with index " + std::to_string(index) + " not found");
	}

	ActiveFrame& FrameStore::getActiveFrame() {
		if (!m_ActiveFrame.isValid()) {

			throw std::runtime_error("No active frame set.");
		}

		return m_ActiveFrame;
	}

	std::vector<FrameImpl>& FrameStore::getFrames() {
		return m_Frames;
	}

	bool FrameStore::hasActiveFrame() const {
		return m_ActiveFrame.isValid();
	}
}}
