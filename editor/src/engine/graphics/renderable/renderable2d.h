#pragma once

#include <string.h>
#include <nlohmann/json.hpp>
#include "../buffer/buffer.h"
#include "../buffer/indexBuffer.h"
#include "../buffer/vertexArray.h"
#include "../../../maths/vec3.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec4.h"
#include "../renderer/vertex_data.h"
#include "../renderer/renderer2d.h"
#include "../../../engine/graphics/shader/shader.h"
#include "bounds.h"
namespace spright { namespace engine {

	class Renderable2D {

	protected:
		Renderable2D() {
			setUVDefaults();
		}

		int m_VertexCount;
		unsigned int m_Color;
		Bounds m_bounds;
		std::vector<Vec2> m_UV;
	public:
		Renderable2D(const Bounds& bounds, unsigned int color);

		friend bool operator==(const Renderable2D&, const Renderable2D&);
		friend bool operator!=(const Renderable2D&, const Renderable2D&);
		virtual bool isEqual(const Renderable2D& obj) const;

		virtual void submit(Renderer2D* renderer) const = 0;

		inline void setColor(unsigned int color) { m_Color = color; }
		inline void setColor(const Vec4& color) {
			int r = (color.x * 255.0f);
			int g = (color.y * 255.0f);
			int b = (color.z * 255.0f);
			int a = (color.w * 255.0f);

			m_Color = a << 24 | b << 16 | g << 8 | r;
		}

		inline const Bounds& getBounds() const {
			return m_bounds;
		}

		inline int getVertexCount() const { return m_VertexCount; }
		inline const unsigned int getColor() const { return m_Color; }
		inline const std::vector<Vec2>& getUV() const { return m_UV; }

		virtual nlohmann::json getJson() = 0;
		inline const GLuint getTID() const { return 0; }
	private:
		void setUVDefaults();
	};
} }
