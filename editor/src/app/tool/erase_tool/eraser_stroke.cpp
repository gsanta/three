#include "./eraser_stroke.h"

namespace spright { namespace editor {
	EraserStroke::EraserStroke(TileLayer* drawLayer, const int eraserSize) : m_DrawLayer(drawLayer), m_EraserSize(eraserSize)
	{
	}

	void editor::EraserStroke::draw(TileLayer* eraseLayer, Vec2& pos)
	{
		if (!m_DrawLayer) {
			throw std::runtime_error("DrawLayer not set.");
		}

		if (!m_TopLine) {
			init(eraseLayer->getTileSize());
		}

		setPosition(eraseLayer, pos);
	}

	void EraserStroke::clear()
	{
		m_DrawLayer->clear();
		m_TopLine = nullptr;
		m_RightLine = nullptr;
		m_BottomLine = nullptr;
		m_LeftLine = nullptr;
	}

	void EraserStroke::init(float tileSize)
	{
		float eraserArea = tileSize * static_cast<float>(m_EraserSize);

		unsigned int color = 0xff0099ff;

		m_TopLine = new Rect2D(-m_EraserSize / 2.0f, m_EraserSize / 2.0f, m_EraserSize, 0.1f, color);
		m_RightLine = new Rect2D(m_EraserSize / 2.0f, -m_EraserSize / 2.0f, 0.1f, m_EraserSize, color);
		m_BottomLine = new Rect2D(-m_EraserSize / 2.0f, -m_EraserSize / 2.0f, m_EraserSize, 0.1f, color);
		m_LeftLine = new Rect2D(-m_EraserSize / 2.0f, -m_EraserSize / 2.0f, 0.1f, m_EraserSize, color);

		m_DrawLayer->add(m_TopLine);
		m_DrawLayer->add(m_RightLine);
		m_DrawLayer->add(m_BottomLine);
		m_DrawLayer->add(m_LeftLine);
	}

	void EraserStroke::setPosition(TileLayer* eraseLayer, Vec2& pos)
	{
		float halfEraserSize = eraseLayer->getTileSize() * static_cast<float>(m_EraserSize) / 2.0f;

		int tileIndex = eraseLayer->getTileIndex(pos);
		float halfTileSize = eraseLayer->getTileSize() / 2.0f;
		Vec2 tileCenterPos = eraseLayer->getCenterPos(tileIndex);

		if (m_EraserSize % 2 == 0) {
			tileCenterPos += Vec2(-halfTileSize, -halfTileSize);
		}

		m_TopLine->setCenterPosition(tileCenterPos + Vec2(0, halfEraserSize));
		m_RightLine->setCenterPosition(tileCenterPos + Vec2(halfEraserSize, 0));
		m_BottomLine->setCenterPosition(tileCenterPos + Vec2(0, -halfEraserSize));
		m_LeftLine->setCenterPosition(tileCenterPos + Vec2(-halfEraserSize, 0));
	}
}}