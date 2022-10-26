#pragma once

#include <string.h>
#include <nlohmann/json.hpp>
#include "../buffer/buffer.h"
#include "../buffer/indexBuffer.h"
#include "../buffer/vertexArray.h"
#include "../../maths/vec3.h"
#include "../../maths/vec2.h"
#include "../../maths/vec4.h"
#include "../renderer/vertex_data.h"
#include "../renderer/renderer2d.h"
#include "../../../engine/graphics/shader/shader.h"
#ifndef SPARKY_EMSCRIPTEN
	#include "../../../engine/graphics/texture/texture.h"
#endif
#include "bounds.h"
namespace my_app_engine { namespace graphics {
	class Renderable2D {

	protected:
		Renderable2D() {
			setUVDefaults();
		}

		int m_VertexCount;
		unsigned int m_Color;
		my_app_engine::graphics::Bounds* m_bounds;
		std::vector<my_app_engine::maths::Vec2> m_UV;
#ifndef SPARKY_EMSCRIPTEN
		my_app_engine::graphics::Texture* m_Texture;
#endif
	public:
		Renderable2D(unsigned int color) : m_Color(color)
		{
			setUVDefaults();
		}

		virtual ~Renderable2D() {}

		virtual void submit(my_app_engine::graphics::Renderer2D* renderer) const = 0;

		void setColor(unsigned int color) { m_Color = color; }
		void setColor(const my_app_engine:: maths::Vec4& color) {
			int r = (color.x * 255.0f);
			int g = (color.y * 255.0f);
			int b = (color.z * 255.0f);
			int a = (color.w * 255.0f);

			m_Color = a << 24 | b << 16 | g << 8 | r;
		}

		inline const my_app_engine::graphics::Bounds* getBounds() const {
			return m_bounds;
		}

		inline int getVertexCount() const { return m_VertexCount; }
		inline const unsigned int getColor() const { return m_Color; }
		inline const std::vector<my_app_engine::maths::Vec2>& getUV() const { return m_UV; }

		virtual nlohmann::json getJson() = 0;
#ifdef SPARKY_EMSCRIPTEN
		inline const GLuint getTID() const { return 0; }
#else
		inline const GLuint getTID() const { return m_Texture == nullptr ? 0 : m_Texture->getId(); }
#endif
	private:
		void setUVDefaults() {
			m_UV.push_back(my_app_engine::maths::Vec2(0, 0));
			m_UV.push_back(my_app_engine::maths::Vec2(0, 1));
			m_UV.push_back(my_app_engine::maths::Vec2(1, 1));
			m_UV.push_back(my_app_engine::maths::Vec2(1, 0));
		}
	};
} }