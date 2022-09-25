#include "sprite.h"

namespace sparky { namespace graphics {
	Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
		: Renderable2D(maths::Vec3(x, y, 0), maths::Vec2(width, height), color)
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
		: Renderable2D(maths::Vec3(x, y, 0), maths::Vec2(width, height), 0xffffffff)
	{
		m_Texture = texture;
	}
#endif

	void Sprite::submit2(VertexData* buffer) const {
		buffer->vertex = *m_TransformationBack * position;
		buffer->uv = m_UV[0];
		buffer->tid = textureSlot;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *m_TransformationBack * maths::Vec3(position.x, position.y + size.y, position.z);
		buffer->uv = m_UV[1];
		buffer->tid = textureSlot;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *m_TransformationBack * maths::Vec3(position.x + size.x, position.y + size.y, position.z);
		buffer->uv = m_UV[2];
		buffer->tid = textureSlot;
		buffer->color = m_Color;
		buffer++;

		buffer->vertex = *m_TransformationBack * maths::Vec3(position.x + size.x, position.y, position.z);
		buffer->uv = m_UV[3];
		buffer->tid = textureSlot;
		buffer->color = m_Color;
		buffer++;
	}


	VertexData* Sprite::getVertices() {
		m_Buffer->vertex = *m_TransformationBack * position;
		m_Buffer->uv = uv[0];
		m_Buffer->tid = textureSlot;
		m_Buffer->color = color;
		m_Buffer++;

		m_Buffer->vertex = *m_TransformationBack * maths::Vec3(position.x, position.y + size.y, position.z);
		m_Buffer->uv = uv[1];
		m_Buffer->tid = textureSlot;
		m_Buffer->color = color;
		m_Buffer++;

		m_Buffer->vertex = *m_TransformationBack * maths::Vec3(position.x + size.x, position.y + size.y, position.z);
		m_Buffer->uv = uv[2];
		m_Buffer->tid = textureSlot;
		m_Buffer->color = color;
		m_Buffer++;

		m_Buffer->vertex = *m_TransformationBack * maths::Vec3(position.x + size.x, position.y, position.z);
		m_Buffer->uv = uv[3];
		m_Buffer->tid = textureSlot;
		m_Buffer->color = color;
		m_Buffer++;
	}
} }

