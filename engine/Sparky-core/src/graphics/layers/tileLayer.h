#pragma once

#include "layer.h";
#include "../batchRenderer2d.h"
#include "../../maths/vec2_int.h"
#include "../shapes/bounds.h";

namespace sparky { namespace graphics {
	class TileLayer : public Layer
	{
	private:
		float m_TileSize = 0.5;
		my_app::graphics::Bounds m_Bounds;
	public:
		TileLayer(Shader* shader);
		virtual ~TileLayer();

		sparky::maths::Vec2 getTilePos(sparky::maths::Vec2 pointer);
	
		inline float getTileSize() const
		{
			return m_TileSize;
		}
	};
}}
