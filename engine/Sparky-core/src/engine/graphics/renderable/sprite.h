#pragma once

#include <string.h>
#include "renderable2d.h"
#include "../renderer/vertex_data.h"
#include <nlohmann/json.hpp>

using namespace std::string_literals;

namespace spright_engine { namespace graphics {

	class Sprite : public spright_engine::graphics::Renderable2D {
	private:
		spright_engine::maths::Vec3 m_Position;
		spright_engine::maths::Vec2 m_Size;
	public:
		Sprite(float x, float y, float width, float height, unsigned int color);
#ifndef SPARKY_EMSCRIPTEN
		Sprite(float x, float y, float width, float height, spright_engine::graphics::Texture * texture);
#endif

		void setSize(spright_engine::maths::Vec2 size);
		void setPosition(spright_engine::maths::Vec3 position);

		virtual nlohmann::json getJson();

		virtual void submit(spright_engine::graphics::Renderer2D* renderer) const override;
	};
} }