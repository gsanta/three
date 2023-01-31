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
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);

		//float layerSize = tempLayer

		tempLayer->clear();
		clearSprites();

		unsigned int color = 0xff0099ff;

		float xStart = static_cast<int>(bottomLeft.x / 0.5f) * 0.5f;
		float xEnd = static_cast<int>(topRight.x / 0.5f) * 0.5f;
		float width = xEnd - xStart;
		float yStart = static_cast<int>(bottomLeft.y / 0.5f) * 0.5f;
		float yEnd = static_cast<int>(topRight.y / 0.5f) * 0.5f;
		float height = yEnd - yStart;

		engine::graphics::Sprite* bottom = new engine::graphics::Sprite(xStart, yStart, width, 0.1f, color);
		engine::graphics::Sprite* top = new engine::graphics::Sprite(xStart, yEnd, width, 0.1f, color);
		engine::graphics::Sprite* left = new engine::graphics::Sprite(xStart, yStart, 0.1f, height, color);
		engine::graphics::Sprite* right = new engine::graphics::Sprite(xEnd, yStart, 0.1f, height, color);

		m_SelectionSprites.push_back(bottom);
		m_SelectionSprites.push_back(top);
		m_SelectionSprites.push_back(left);
		m_SelectionSprites.push_back(right);

		tempLayer->add(bottom);
		tempLayer->add(top);
		tempLayer->add(left);
		tempLayer->add(right);
	}

	void SelectionBox::move(Vec2 delta)
	{
		m_AbsoluteDelta += delta;

		float xDelta = static_cast<int>(m_AbsoluteDelta.x / 0.5f) * 0.5f;
		float yDelta = static_cast<int>(m_AbsoluteDelta.y / 0.5f) * 0.5f;

		for (Sprite* sprite : m_SelectionSprites) {
			sprite->translate(Vec2(-m_PrevTranslate.x, -m_PrevTranslate.y));
			sprite->translate(Vec2(xDelta, yDelta));
		}

		m_PrevTranslate.x = xDelta;
		m_PrevTranslate.y = yDelta;
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
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);

		tempLayer->clear();

		m_SelectionSprites.clear();
	}
}