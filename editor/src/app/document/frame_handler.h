#pragma once

#include <vector>
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace engine;

	class FrameHandler {
	private:
		std::vector<std::vector<TileLayer*>> m_Frames;

		size_t m_ActiveFrameIndex = 0;

		
	public:
		//addFrame(std::vector<TileLayer*>);
	};
}}