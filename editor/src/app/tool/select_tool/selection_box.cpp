#include "selection_box.h"

namespace spright {
	SelectionBox::SelectionBox(DocumentStore* documentStore) : m_DocumentStore(documentStore)
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

	void SelectionBox::setPosition(Vec2 pos) {

		calcSelectionBounds(m_Start, pos);

		Vec2 bottomLeft = m_Rect.bottomLeft;
		Vec2 topRight = m_Rect.topRight;

		Document* document = this->m_DocumentStore->getActiveDocument();
		TileLayer* tempLayer = document->getLayerHandler()->getTileLayer(DEFAULT_TEMP_LAYER_ID);

		float tileSize = tempLayer->getTileSize();

		tempLayer->clear();
		clearSprites();

		unsigned int color = 0xff0099ff;

		float xStart = static_cast<int>(bottomLeft.x / tileSize) * tileSize;
		float xEnd = static_cast<int>(topRight.x / tileSize) * tileSize;
		float width = xEnd - xStart;
		float yStart = static_cast<int>(bottomLeft.y / tileSize) * tileSize;
		float yEnd = static_cast<int>(topRight.y / tileSize) * tileSize;
		float height = yEnd - yStart;

		Rect2D* bottom = new Rect2D(xStart, yStart, width, 0.1f, color);
		Rect2D* top = new Rect2D(xStart, yEnd, width, 0.1f, color);
		Rect2D* left = new Rect2D(xStart, yStart, 0.1f, height, color);
		Rect2D* right = new Rect2D(xEnd, yStart, 0.1f, height, color);

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
		Document* document = this->m_DocumentStore->getActiveDocument();
		TileLayer* tempLayer = document->getLayerHandler()->getTileLayer(DEFAULT_TEMP_LAYER_ID);

		float tileSize = tempLayer->getTileSize();

		m_AbsoluteDelta += delta;

		float xDelta = static_cast<int>(m_AbsoluteDelta.x / tileSize) * tileSize;
		float yDelta = static_cast<int>(m_AbsoluteDelta.y / tileSize) * tileSize;

		for (Rect2D* sprite : m_SelectionSprites) {
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
		Document* document = this->m_DocumentStore->getActiveDocument();
		auto tempLayer = this->m_DocumentStore->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);

		tempLayer->clear();

		m_SelectionSprites.clear();
	}
}