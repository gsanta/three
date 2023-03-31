#pragma once

#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {

	using namespace engine;

	class Checkerboard {

	public:
		void create(TileLayer& layer) const;
	};
}}