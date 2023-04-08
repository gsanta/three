#include "./eraser_stroke.h"

namespace spright { namespace editor {
	EraserStroke::EraserStroke()
	{
	}

	EraserStroke::EraserStroke(int eraserSize) : m_Size(eraserSize)
	{
	}

	void editor::EraserStroke::draw(const TileLayer& eraseLayer, TileLayer& drawLayer, const Vec2& pos)
	{
		if (!m_TopLine) {
			init(drawLayer, eraseLayer.getTileSize());
		}

		setPosition(eraseLayer, pos);
	}

	void EraserStroke::clear()
	{
		m_TopLine = nullptr;
		m_RightLine = nullptr;
		m_BottomLine = nullptr;
		m_LeftLine = nullptr;
	}

	float EraserStroke::getStrokeWidth()
	{
		return m_StrokeWidth;
	}

	void EraserStroke::init(TileLayer& drawLayer, float tileSize)
	{
		float eraserArea = tileSize * static_cast<float>(m_Size);

		unsigned int color = 0xff0099ff;

		m_TopLine = new Rect2D(-eraserArea / 2.0f, eraserArea / 2.0f, eraserArea, m_StrokeWidth, color);
		m_RightLine = new Rect2D(eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color);
		m_BottomLine = new Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, eraserArea, m_StrokeWidth, color);
		m_LeftLine = new Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color);

		m_TopLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
		m_RightLine = &drawLayer.add(Rect2D(eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
		m_BottomLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
		m_LeftLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
	}

	void EraserStroke::setPosition(const TileLayer& eraseLayer, const Vec2& pos)
	{
		float halfEraserSize = eraseLayer.getTileSize() * static_cast<float>(m_Size) / 2.0f;

		int tileIndex = eraseLayer.getTileIndex(pos);
		float halfTileSize = eraseLayer.getTileSize() / 2.0f;
		Vec2 tileCenterPos = eraseLayer.getWorldPos(tileIndex);

		if (m_Size % 2 == 0) {
			tileCenterPos += Vec2(-halfTileSize, -halfTileSize);
		}

		m_TopLine->setCenterPosition(tileCenterPos + Vec2(0, halfEraserSize));
		m_RightLine->setCenterPosition(tileCenterPos + Vec2(halfEraserSize, 0));
		m_BottomLine->setCenterPosition(tileCenterPos + Vec2(0, -halfEraserSize));
		m_LeftLine->setCenterPosition(tileCenterPos + Vec2(-halfEraserSize, 0));
	}
}}