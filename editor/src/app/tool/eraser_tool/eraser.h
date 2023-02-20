#pragma once
#include "../../../maths/vec2_int.h"
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace spright::maths;
	using namespace spright::engine;

	class Eraser {
	public:
		void erase(TileLayer& layer, const Vec2Int& vec2, int eraserSize);
	};
}}