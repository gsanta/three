#include "brush.h"

namespace spright { namespace editor {

	void Brush::paint(TileLayer* tileLayer, Vec2Int& tilePos, unsigned int color)
	{
		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable == nullptr) {
			Vec2 worldPos = tileLayer->getBottomLeftPos(tileIndex);
			Rect2D* sprite = new Rect2D(worldPos.x, worldPos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
			tileLayer->add(sprite);
		}
		else {
			renderable->setColor(color);
		}
	}
}}