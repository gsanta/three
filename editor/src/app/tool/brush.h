#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../maths/vec2_int.h"
#include "../../maths/vec2.h"

namespace spright { namespace editor {
	using namespace spright::engine;
	using namespace ::spright::maths;

	class Brush {

	public:
		void paint(TileLayer* tileLayer, Vec2Int tilePos, unsigned int color);
	};
}}