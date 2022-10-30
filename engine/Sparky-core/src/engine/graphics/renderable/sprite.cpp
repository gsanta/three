#include "sprite.h"

namespace spright_engine { namespace graphics {
	Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
		: m_Position(spright_engine::maths::Vec3(x, y, 0)), m_Size(spright_engine::maths::Vec2(width, height)), spright_engine::graphics::Renderable2D(color)
	{
		m_bounds = new spright_engine::graphics::Bounds();
		m_bounds = new spright_engine::graphics::Bounds();
		m_bounds->minX = x - width / 2;
		m_bounds->maxX = x + width / 2;
		m_bounds->minY = y - width / 2;
		m_bounds->maxY = y + width / 2;

		m_VertexCount = 4;
	}

#ifndef SPARKY_EMSCRIPTEN
	Sprite::Sprite(float x, float y, float width, float height, spright_engine::graphics::Texture* texture)
		: m_Position(spright_engine::maths::Vec3(x, y, 0)), m_Size(spright_engine::maths::Vec2(width, height)), spright_engine::graphics::Renderable2D(0xffffffff)
	{
		m_Texture = texture;
	}
#endif

	void Sprite::setSize(spright_engine::maths::Vec2 size)
	{
		this->m_Size = size;
	}

	void Sprite::setPosition(spright_engine::maths::Vec3 position)
	{
		this->m_Position = position;
	}

	nlohmann::json Sprite::getJson()
	{
		nlohmann::json json = {
			{"posX", m_Position.x},
			{"posY", m_Position.y},
			{"posZ", m_Position.z},
			{"sizeX", m_Size.x},
			{"sizeY", m_Size.y},
		};

		return json;
	}

	void Sprite::submit(spright_engine::graphics::Renderer2D* renderer) const {
		spright_engine::graphics::VertexData*& buffer = renderer->getBuffer();
		const spright_engine::maths::Mat4* transformation = renderer->getTransformation();
		buffer->vertex = *transformation * m_Position;
		buffer->uv = m_UV[0];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * spright_engine::maths::Vec3(m_Position.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[1];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * spright_engine::maths::Vec3(m_Position.x + m_Size.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[2];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * spright_engine::maths::Vec3(m_Position.x + m_Size.x, m_Position.y, m_Position.z);
		buffer->uv = m_UV[3];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		renderer->setIndexCount(renderer->getIndexCount() + 6);
	}
} }

