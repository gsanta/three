#pragma once

#include "renderable2d.h"
#include "./renderer/vertex_data.h"

namespace my_app { namespace graphics {

	class Sprite : public Renderable2D {
	private:
		maths::Vec3 m_Position;
		maths::Vec2 m_Size;
	public:
		Sprite(float x, float y, float width, float height, unsigned int color);
#ifndef SPARKY_EMSCRIPTEN
		Sprite(float x, float y, float width, float height, Texture* texture);
#endif

		void setSize(maths::Vec2 size);
		void setPosition(maths::Vec3 position);

		virtual void submit(Renderer2D* renderer) const override;
	};
} }