#include "line_shape.h"

namespace spright { namespace engine {
	LineShape::LineShape(float x1, float y1, float x2, float y2, float thickness, unsigned int color): 
		m_Start(Vec2(x1, y1)), m_End(Vec2(x2, y2)), m_Thickness(thickness), Renderable2D(Bounds(), color) {
	
		Vec2 vec = m_End - m_Start;
		m_Length = sqrt(vec.x * vec.x + vec.y * vec.y);
		m_Dir = (m_End - m_Start) / m_Length;
		m_Normal = Vec2(-m_Dir.y, m_Dir.x);


		Vec2 coord0 = m_Start + m_Normal * m_Thickness;
		Vec2 coord1 = m_Start - m_Normal * m_Thickness;
		Vec2 coord2 = m_End - m_Normal * m_Thickness;
		Vec2 coord3 = m_End + m_Normal * m_Thickness;

		m_Coords[0] = Vec3(coord0.x, coord0.y, 0);
		m_Coords[1] = Vec3(coord1.x, coord1.y, 0);
		m_Coords[2] = Vec3(coord2.x, coord2.y, 0);
		m_Coords[3] = Vec3(coord3.x, coord3.y, 0);
	}

	void LineShape::submit(Renderer2D* renderer) const {
		VertexData*& buffer = renderer->getBuffer();
		const Mat4* transformation = renderer->getTransformation();
		buffer->vertex = *transformation * m_Coords[0];
		buffer->uv = m_UV[0];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * m_Coords[1];
		buffer->uv = m_UV[1];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * m_Coords[2];
		buffer->uv = m_UV[2];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * m_Coords[3];
		buffer->uv = m_UV[3];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		renderer->setIndexCount(renderer->getIndexCount() + 6);
	}
}}