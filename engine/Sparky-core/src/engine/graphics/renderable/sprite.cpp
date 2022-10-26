#include "sprite.h"

namespace my_app_engine { namespace graphics {
	Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
		: m_Position(my_app_engine::maths::Vec3(x, y, 0)), m_Size(my_app_engine::maths::Vec2(width, height)), my_app_engine::graphics::Renderable2D(color)
	{
		m_bounds = new my_app_engine::graphics::Bounds();
		m_bounds = new my_app_engine::graphics::Bounds();
		m_bounds->minX = x - width / 2;
		m_bounds->maxX = x + width / 2;
		m_bounds->minY = y - width / 2;
		m_bounds->maxY = y + width / 2;

		m_VertexCount = 4;
	}

#ifndef SPARKY_EMSCRIPTEN
	Sprite::Sprite(float x, float y, float width, float height, my_app_engine::graphics::Texture* texture)
		: m_Position(my_app_engine::maths::Vec3(x, y, 0)), m_Size(my_app_engine::maths::Vec2(width, height)), my_app_engine::graphics::Renderable2D(0xffffffff)
	{
		m_Texture = texture;
	}
#endif

	void Sprite::setSize(my_app_engine::maths::Vec2 size)
	{
		this->m_Size = size;
	}

	void Sprite::setPosition(my_app_engine::maths::Vec3 position)
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

	void Sprite::submit(my_app_engine::graphics::Renderer2D* renderer) const {
		my_app_engine::graphics::VertexData*& buffer = renderer->getBuffer();
		const my_app_engine::maths::Mat4* transformation = renderer->getTransformation();
		buffer->vertex = *transformation * m_Position;
		buffer->uv = m_UV[0];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * my_app_engine::maths::Vec3(m_Position.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[1];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * my_app_engine::maths::Vec3(m_Position.x + m_Size.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[2];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * my_app_engine::maths::Vec3(m_Position.x + m_Size.x, m_Position.y, m_Position.z);
		buffer->uv = m_UV[3];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		renderer->setIndexCount(renderer->getIndexCount() + 6);
	}
} }

