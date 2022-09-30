#pragma once

#include <string>
#include "layer.h"
#include "../batchRenderer2d.h"
#include "../../maths/vec2_int.h"
#include "../shapes/bounds.h"

namespace my_app { namespace graphics {
	class TileLayer : public Layer
	{
	private:
		float m_TileSize = 0.5;
		my_app::graphics::Bounds m_Bounds;
	public:
		TileLayer(std::string id, Shader* shader);
		virtual ~TileLayer();

		my_app::maths::Vec2 getTilePos(my_app::maths::Vec2 pointer);
	
		inline float getTileSize() const
		{
			return m_TileSize;
		}
	};
}}
