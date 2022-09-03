#pragma once

#include "layer.h";
#include "../batchRenderer2d.h";

namespace sparky {
	namespace graphics {
		class TileLayer : public Layer
		{
		public:
			TileLayer(Shader* shader);
			virtual ~TileLayer();
		};
	}
}


#pragma once
