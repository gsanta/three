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
		void addFrame(const Frame& frame);
		void setActiveFrame(size_t index);
		ActiveFrame& getActiveFrame();
		bool hasActiveFrame() const;
		Frame& getFrame(size_t index);
	};
}}