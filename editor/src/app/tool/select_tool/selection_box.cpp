#include "selection_box.h"

namespace spright {
	SelectionBox::SelectionBox(DocumentHandler* documentHandler) : m_DocumentHandler(documentHandler)
	{
	}

	SelectionBox::~SelectionBox()
	{
	}

	void SelectionBox::start(Vec2 pos)
	{
		clear();
		m_Start = pos;
		m_Rect.bottomLeft = pos;
		m_Rect.topRight = pos;
	}

	void SelectionBox::update(Vec2 pos) {

		calcSelectionBounds(m_Start, pos);

		Vec2 bottomLeft = m_Rect.bottomLeft;
		Vec2 topRight = m_Rect.topRight;

		Document* document = this->m_DocumentHandler->getActiveDocument();
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);

		tempLayer->clear();
		clearSprites();

		for (float x = bottomLeft.x; x < topRight.x; x += 2 * m_DashSize) {
			engine::graphics::Sprite* sprite = new engine::graphics::Sprite(x, bottomLeft.y, m_DashSize, 0.1f, 0xff0000ff);
			engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(x, topRight.y, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

		for (float y = bottomLeft.y; y < topRight.y; y += 2 * m_DashSize) {
			engine::graphics::Sprite* sprite = new engine::graphics::Sprite(bottomLeft.x, y, m_DashSize, 0.1f, 0xff0000ff);
			engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(topRight.x, y, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

	}

	void SelectionBox::move(Vec2 delta)
	{
		for (Sprite* sprite : m_SelectionSprites) {
			sprite->translate(delta);
		}
	}

	void SelectionBox::clear()
	{
		clearSprites();
		m_Start = Vec2();
		m_Rect.topRight = Vec2();
		m_Rect.bottomLeft = Vec2();
	}

	bool SelectionBox::isInsideSelection(Vec2 point)
	{
		return m_Rect.contains(point);
	}

	void SelectionBox::calcSelectionBounds(Vec2 vec1, Vec2 vec2)
	{
		float startX = vec1.x < vec2.x ? vec1.x : vec2.x;
		float endX = vec1.x < vec2.x ? vec2.x : vec1.x;
		float startY = vec1.y < vec2.y ? vec1.y : vec2.y;
		float endY = vec1.y < vec2.y ? vec2.y : vec1.y;

		m_Rect.bottomLeft = Vec2(startX, startY);
		m_Rect.topRight = Vec2(endX, endY);
	}

	void SelectionBox::clearSprites()
	{
		Document* document = this->m_DocumentHandler->getActiveDocument();
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);

		tempLayer->clear();

		m_SelectionSprites.clear();
	}
}