#include "sprite.h"

namespace engine {
	namespace graphics {
		Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
			: m_Position(Vec3(x, y, 0)), m_Size(Vec2(width, height)), engine::graphics::Renderable2D(color)
		{
			m_bounds = new engine::graphics::Bounds(x, y, width, height);

			m_VertexCount = 4;
		}

#ifndef SPARKY_EMSCRIPTEN
		Sprite::Sprite(float x, float y, float width, float height, engine::graphics::Texture* texture)
			: m_Position(Vec3(x, y, 0)), m_Size(Vec2(width, height)), engine::graphics::Renderable2D(0xffffffff)
		{
			m_Texture = texture;
		}
#endif

		int Sprite::getTileIndex() {
			return m_TileIndex;
		}

		void Sprite::setTileIndex(int index) {
			m_TileIndex = index;
		}

		Vec3 Sprite::getPosition() {
			return m_Position;
		}

		Vec2 Sprite::getPosition2d() {
			return Vec2(m_Position.x, m_Position.y);
		}

		void Sprite::setSize(Vec2 size)
		{
			this->m_Size = size;
		}

		void Sprite::setPosition(Vec2 position)
		{
			this->m_Position = Vec3(position.x, position.y, m_Position.z);
			updateBounds();
		}

		bool Sprite::contains(Vec2 point)
		{
			const Bounds* bounds = getBounds();
			return point.x > bounds->minX && point.x < bounds->maxX&& point.y > bounds->minY && point.y < bounds->maxY;
		}

		void Sprite::translate(Vec2 vec)
		{
			this->m_Position.x += vec.x;
			this->m_Position.y += vec.y;
			updateBounds();
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

	void Sprite::submit(engine::graphics::Renderer2D* renderer) const {
		engine::graphics::VertexData*& buffer = renderer->getBuffer();
		const Mat4* transformation = renderer->getTransformation();
		buffer->vertex = *transformation * m_Position;
		buffer->uv = m_UV[0];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * Vec3(m_Position.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[1];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * Vec3(m_Position.x + m_Size.x, m_Position.y + m_Size.y, m_Position.z);
		buffer->uv = m_UV[2];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *transformation * Vec3(m_Position.x + m_Size.x, m_Position.y, m_Position.z);
		buffer->uv = m_UV[3];
		buffer->tid = 0.0f;
		buffer->color = m_Color;
		buffer++;

		renderer->setIndexCount(renderer->getIndexCount() + 6);
	}

	void Sprite::updateBounds() {
		m_bounds->minX = m_Position.x - m_bounds->getWidth() / 2;
		m_bounds->maxX = m_Position.x + m_bounds->getWidth() / 2;
		m_bounds->minY = m_Position.y - m_bounds->getHeight() / 2;
		m_bounds->maxY = m_Position.y + m_bounds->getHeight() / 2;
	}
} }

