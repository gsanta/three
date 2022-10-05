#include "sprite.h"

namespace my_app { namespace graphics {
	Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
		: m_Position(maths::Vec3(x, y, 0)), m_Size(maths::Vec2(width, height)), Renderable2D(color)
	{
		m_bounds = new my_app::graphics::Bounds();
		m_bounds->minX = x - width / 2;
		m_bounds->maxX = x + width / 2;
		m_bounds->minY = y - width / 2;
		m_bounds->maxY = y + width / 2;

		m_VertexCount = 4;
	}

#ifndef SPARKY_EMSCRIPTEN
	Sprite::Sprite(float x, float y, float width, float height, Texture* texture)
		: m_Position(maths::Vec3(x, y, 0)), m_Size(maths::Vec2(width, height)), Renderable2D(0xffffffff)
	{
		m_Texture = texture;
	}
#endif

	void Sprite::setSize(maths::Vec2 size)
	{
		this->m_Size = size;
	}

	void Sprite::setPosition(maths::Vec3 position)
	{
		this->m_Position = position;
	}

	void Sprite::submit(Renderer2D* renderer) const {
		VertexData*& buffer = renderer->getBuffer();
		const maths::Mat4* transformation = renderer->getTransformation();
		buffer->vertex = *transformation * m_Position;
		buffer->uv = m_UV[0];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * maths::Vec3(m_Position.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[1];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * maths::Vec3(m_Position.x + m_Size.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[2];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * maths::Vec3(m_Position.x + m_Size.x, m_Position.y, m_Position.z);
		buffer->uv = m_UV[3];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		renderer->setIndexCount(renderer->getIndexCount() + 6);
	}
} }

