#pragma once

#include <string>
#include "layer.h"
#include "../renderer/batchRenderer2d.h"
#include "../renderable/sprite.h"
#include "../../maths/vec2_int.h"
#include "../renderable/bounds.h"
#include "../../maths/mat4.h"
#include "../camera/camera.h"

namespace spright_engine { namespace graphics {
	class TileLayer : public Layer
	{
	private:
		float m_TileSize = 0.5;
		spright_engine::graphics::Bounds m_Bounds;
	public:
		TileLayer(std::string id, spright_engine::graphics::Shader* shader, spright_engine::graphics::Renderer2D* renderer, Camera* camera);
		virtual ~TileLayer();

		spright_engine::maths::Vec2 getTilePos(spright_engine::maths::Vec2 pointer);

		virtual nlohmann::json getJson() override;
		virtual void setJson(std::string json);

		inline float getTileSize() const
		{
			return m_TileSize;
		}
	};
}}
