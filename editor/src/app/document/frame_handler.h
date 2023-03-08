#pragma once

#include <vector>
#include "../../engine/graphics/layer/tileLayer.h"
#include "frame_impl.h"
#include "active_frame.h"

namespace spright { namespace editor {
	using namespace engine;

	class FrameHandler {
	private:
		std::vector<FrameImpl> m_Frames;

		ActiveFrame* m_ActiveFrame = nullptr;
	public:
		void addFrame(const Frame& frame);
		void setActiveFrame(const Frame& frame);
		Frame& getFrame(size_t index);
	};
}}