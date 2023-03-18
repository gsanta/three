#pragma once

#include <vector>
#include <memory>
#include "../../engine/graphics/layer/tileLayer.h"
#include "frame_impl.h"
#include "active_frame.h"

namespace spright { namespace editor {
	using namespace engine;

	class FrameStore {
	private:
		std::vector<FrameImpl> m_Frames;
		ActiveFrame m_ActiveFrame;

	public:
		FrameStore();

		void addFrame(const Frame& frame);
		void removeFrame(size_t index);
		void setActiveFrame(size_t index);
		ActiveFrame& getActiveFrame();
		bool hasActiveFrame() const;
		std::vector<FrameImpl>& getFrames();

		Frame& getFrame(size_t index);
	};
}}