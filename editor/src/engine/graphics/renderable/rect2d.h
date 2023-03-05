#pragma once

#include <string.h>
#include "renderable2d.h"
#include "../renderer/vertex_data.h"
#include <nlohmann/json.hpp>

using namespace std::string_literals;

namespace spright { namespace engine {
	using namespace spright::maths;

	class Rect2D : public Renderable2D {
	private:
		Vec3 m_Position;
		Vec2 m_Size;
		int m_TileIndex = -1;
	public:
		Rect2D(float x, float y, float width, float height, unsigned int color);
		Rect2D(const Rect2D&);

		Vec3 getPosition();
		Vec2 getPosition2d();
		int getTileIndex();
		void setTileIndex(int tileIndex);
		void setSize(Vec2 size);
		Vec2 getSize();
		void setPosition(Vec2 position);
		void setCenterPosition(Vec2 position);
		Vec2 getCenterPosition2d() const;
		bool contains(Vec2 point);
		void translate(Vec2 vec);
		nlohmann::json getJson() override;

		virtual void submit(Renderer2D* renderer) const override;
	private:
		void updateBounds();
	};
} }
