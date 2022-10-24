#pragma once

#include <string.h>
#include "renderable2d.h"
#include "../renderer/vertex_data.h"

namespace my_app_engine { namespace graphics {

	class Sprite : public my_app_engine::graphics::Renderable2D {
	private:
		my_app_engine::maths::Vec3 m_Position;
		my_app_engine::maths::Vec2 m_Size;
	public:
		Sprite(float x, float y, float width, float height, unsigned int color);
#ifndef SPARKY_EMSCRIPTEN
		Sprite(float x, float y, float width, float height, my_app_engine::graphics::Texture * texture);
#endif

		void setSize(my_app_engine::maths::Vec2 size);
		void setPosition(my_app_engine::maths::Vec3 position);

		virtual std::string getJson();

		virtual void submit(my_app_engine::graphics::Renderer2D* renderer) const override;
	};
} }