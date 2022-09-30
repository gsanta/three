#pragma once

#include "buffers/buffer.h"
#include "buffers/indexBuffer.h"
#include "buffers/vertexArray.h"
#include "../maths/vec3.h"
#include "../maths/vec2.h"
#include "../maths/vec4.h"
#include "./renderer/vertex_data.h"
#include "renderer2d.h"
#include "shader.h"
#ifndef SPARKY_EMSCRIPTEN
	#include "texture/texture.h"
#endif
#include "shapes/bounds.h"
namespace my_app { namespace graphics {
	class Renderable2D {

	protected:
		Renderable2D() {
			setUVDefaults();
		}
		maths::Vec3 m_Position;
		maths::Vec2 m_Size;
		int m_VertexCount;
		unsigned int m_Color;
		my_app::graphics::Bounds* m_bounds;
		std::vector<maths::Vec2> m_UV;
#ifndef SPARKY_EMSCRIPTEN
		Texture* m_Texture;
#endif
	public:
		Renderable2D(maths::Vec3 position, maths::Vec2 size, unsigned int color)
			: m_Position(position), m_Size(size), m_Color(color)
		{
			setUVDefaults();
		}

		virtual ~Renderable2D() {}

		virtual void submit(Renderer2D* renderer) const = 0;

		void setColor(unsigned int color) { m_Color = color; }
		void setColor(const maths::Vec4& color) {
			int r = (color.x * 255.0f);
			int g = (color.y * 255.0f);
			int b = (color.z * 255.0f);
			int a = (color.w * 255.0f);

			m_Color = a << 24 | b << 16 | g << 8 | r;
		}

		void setSize(maths::Vec2 size);
		void setPosition(maths::Vec3 position);

		inline const my_app::graphics::Bounds* getBounds() const {
			return m_bounds;
		}

		inline const maths::Vec3& getPosition() const { return m_Position; }
		inline const maths::Vec2& getSize() const { return m_Size; }
		inline int getVertexCount() const { return m_VertexCount; }
		inline const unsigned int getColor() const { return m_Color; }
		inline const std::vector<maths::Vec2>& getUV() const { return m_UV; }
#ifdef SPARKY_EMSCRIPTEN
		inline const GLuint getTID() const { return 0; }
#else
		inline const GLuint getTID() const { return m_Texture == nullptr ? 0 : m_Texture->getId(); }
#endif
	private:
		void setUVDefaults() {
			m_UV.push_back(maths::Vec2(0, 0));
			m_UV.push_back(maths::Vec2(0, 1));
			m_UV.push_back(maths::Vec2(1, 1));
			m_UV.push_back(maths::Vec2(1, 0));
		}
	};
} }