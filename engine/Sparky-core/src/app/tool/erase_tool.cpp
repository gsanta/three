#include "erase_tool.h"

namespace spright { namespace tool {

	EraseTool::EraseTool(DocumentHandler* documentHandler, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_EventHandler(eventHandler), Tool("erase")
	{

	}

	void EraseTool::pointerDown(PointerInfo& pointerInfo)
	{
		Document* activeDocument = m_DocumentHandler->getActiveDocument();
		engine::graphics::Layer* layer = dynamic_cast<engine::graphics::TileLayer*>(activeDocument->getActiveLayer());

		auto it = layer->getRenderables().begin();
		while (it != layer->getRenderables().end()) {
			const engine::graphics::Bounds* bounds = (*it)->getBounds();

			if (dynamic_cast<engine::graphics::Sprite*>(*it)->contains(pointerInfo.down)) {
				m_IsMoveSelection = true;
				return;
			}
		}

		m_IsMoveSelection = false;
	}

	void EraseTool::pointerUp(PointerInfo& pointerInfo)
	{
		Document* activeDocument = m_DocumentHandler->getActiveDocument();

		engine::maths::Vec2 down = pointerInfo.down;
		engine::maths::Vec2 curr = pointerInfo.curr;

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		engine::graphics::Layer* layer = dynamic_cast<engine::graphics::TileLayer*>(activeDocument->getActiveLayer());

		auto it = layer->getRenderables().begin();
		while (it != layer->getRenderables().end()) {
			const engine::graphics::Bounds* bounds = (*it)->getBounds();

			if (bounds->minX > startX && bounds->maxX < endX && bounds->minY > startY && bounds->maxY < endY) {
				layer->remove(*it);
			}
			else {
				++it;
			}
		}

		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();

		m_EventHandler->emitDataChange();
	}

	void EraseTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			return;
		}

		if (m_IsMoveSelection) {
			move(pointerInfo);
		}
		else {
			select(pointerInfo);
		}
	}

	void EraseTool::select(PointerInfo& pointerInfo)
	{
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();

		for (engine::graphics::Sprite* sprite : m_SelectionSprites) {
			delete sprite;
		}

		m_SelectionSprites.clear();

		engine::maths::Vec2 down = pointerInfo.down;
		engine::maths::Vec2 curr = pointerInfo.curr;

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		for (float x = startX; x < endX; x += 2 * m_DashSize) {
			engine::graphics::Sprite* sprite = new engine::graphics::Sprite(x, startY, m_DashSize, 0.1f, 0xff0000ff);
			engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(x, endY, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

		for (float y = startY; y < endY; y += 2 * m_DashSize) {
			engine::graphics::Sprite* sprite = new engine::graphics::Sprite(startX, y, m_DashSize, 0.1f, 0xff0000ff);
			engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(endX, y, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

	}

	void EraseTool::move(PointerInfo& pointerInfo)
	{

	}
}}