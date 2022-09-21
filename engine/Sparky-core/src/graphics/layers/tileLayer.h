#pragma once

#include "layer.h";
#include "../batchRenderer2d.h"
#include "../../maths/vec2_int.h"

namespace sparky { namespace graphics {
	class TileLayer : public Layer
	{
	private:
		float m_TileSize = 0.2;
	public:
		TileLayer(Shader* shader);
		virtual ~TileLayer();

		my_app::maths::Vec2Int getTileAt(sparky::maths::Vec2 pointer);
	
		inline float getPixelSize() const
		{
			return m_TileSize;
		}
	};
}}
