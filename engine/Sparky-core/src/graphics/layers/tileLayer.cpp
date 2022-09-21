#include "tileLayer.h"

namespace sparky { namespace graphics {

	TileLayer::TileLayer(Shader* shader)
		: Layer(new BatchRenderer2D(), shader, maths::Mat4::otrthographic(-16.0f, 16.0f, -9.0f, 9.0f, -1.0f, 1.0f)) {

	}

	TileLayer::~TileLayer() {}
		
	my_app::maths::Vec2Int TileLayer::getTileAt(sparky::maths::Vec2 pointer)
	{
		int x = pointer.x / m_TileSize;
		int y = pointer.y / m_TileSize;

		return my_app::maths::Vec2Int(x, y);
	}
}}