#pragma once
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace spright::engine;

	class LayerProvider {
	public:
		virtual TileLayer& getActiveLayer() = 0;
		virtual TileLayer& getTempLayer() = 0;
	};
}}