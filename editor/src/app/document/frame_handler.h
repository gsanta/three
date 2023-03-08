#pragma once

#include <vector>
#include <memory>
#include "../../engine/graphics/layer/tileLayer.h"
#include "frame_impl.h"
#include "active_frame.h"

namespace spright { namespace editor {
	using namespace engine;

	class FrameHandler {
	private:
		std::vector<FrameImpl> m_Frames;

		std::shared_ptr<ActiveFrame> m_ActiveFrame = nullptr;
	public:
		void addFrame(const Frame& frame);
		void setActiveFrame(size_t index);
		std::shared_ptr<ActiveFrame> getActiveFrame();
		Frame& getFrame(size_t index);
	};
}}