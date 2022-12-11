#pragma once

#include <string>
#include "layer.h"
#include "../renderer/batchRenderer2d.h"
#include "../renderable/sprite.h"
#include "../../maths/vec2_int.h"
#include "../../maths/vec2.h"
#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../../maths/mat4.h"
#include "../camera/camera.h"
#include "dimensions.h"

namespace spright_engine { namespace graphics {
	class TileLayer : public Layer
	{
	private:
		float m_TileSize = 0.5;
		int m_IndexSize;
		Renderable2D** m_TileIndexes;
		BoundsInt m_TileBounds;

	public:
		TileLayer(std::string name, std::string id, spright_engine::graphics::Shader* shader, spright_engine::graphics::Renderer2D* renderer, Camera* camera, Dimensions dimensions);
		virtual ~TileLayer();

		// TODO: find a better name
		spright_engine::maths::Vec2 getBottomLeftPos(spright_engine::maths::Vec2 pointer);
		maths::Vec2Int getTilePos(maths::Vec2 pos);
		maths::Vec2 getWorldPos(int x, int y);

		virtual nlohmann::json getJson() override;
		virtual void setJson(std::string json);
		virtual void add(Renderable2D* renderable);
		Renderable2D* getAtTileIndex(int tileIndex);
		int getTileIndex(int tileX, int tileY);
		const BoundsInt& getTileBounds() const;

		inline float getTileSize() const
		{
			return m_TileSize;
		}
	};
}}
