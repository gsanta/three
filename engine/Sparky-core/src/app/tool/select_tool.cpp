#include "select_tool.h"

namespace spright_app {

	SelectTool::SelectTool(DocumentHandler* documentHandler, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_EventHandler(eventHandler), Tool("select")
	{

	}

	void SelectTool::pointerDown(tool::PointerInfo& pointerInfo)
	{
	}

	void SelectTool::pointerUp(tool::PointerInfo& pointerInfo)
	{
		Document* activeDocument = m_DocumentHandler->getActiveDocument();

		spright_engine::maths::Vec2 down = pointerInfo.down;
		spright_engine::maths::Vec2 curr = pointerInfo.curr;

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		spright_engine::graphics::Layer* layer = dynamic_cast<spright_engine::graphics::TileLayer*>(activeDocument->getActiveLayer());

		auto it = layer->getRenderables().begin();
		while (it != layer->getRenderables().end()) {
			const spright_engine::graphics::Bounds* bounds = (*it)->getBounds();

			if (bounds->minX > startX && bounds->maxX < endX && bounds->minY > startY && bounds->maxY < endY) {
				m_PixelSprites.push_back(*it);
			}
			else {
				++it;
			}
		}

		m_EventHandler->emitDataChange();
	}

	void SelectTool::pointerMove(tool::PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			return;
		}

		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();

		for (spright_engine::graphics::Sprite* sprite : m_SelectionSprites) {
			delete sprite;
		}

		m_SelectionSprites.clear();

		spright_engine::maths::Vec2 down = pointerInfo.down;
		spright_engine::maths::Vec2 curr = pointerInfo.curr;

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		for (float x = startX; x < endX; x += 2 * m_DashSize) {
			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(x, startY, m_DashSize, 0.1f, 0xff0000ff);
			spright_engine::graphics::Sprite* sprite2 = new spright_engine::graphics::Sprite(x, endY, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

		for (float y = startY; y < endY; y += 2 * m_DashSize) {
			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(startX, y, m_DashSize, 0.1f, 0xff0000ff);
			spright_engine::graphics::Sprite* sprite2 = new spright_engine::graphics::Sprite(endX, y, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

		std::cout << "size: " << m_SelectionSprites.size() << std::endl;
	}
}