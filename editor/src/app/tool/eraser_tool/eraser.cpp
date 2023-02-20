#include "eraser.h"

namespace spright { namespace editor {
	void editor::Eraser::erase(TileLayer& layer, const Vec2Int& vec2, int eraserSize) {
		int tileIndex = layer.getTileIndex(vec2.x, vec2.y);

		bool isEven = true;

		if (eraserSize % 2 == 1) {
			isEven = false;
		}

		int start = isEven ? -eraserSize / 2 : -(eraserSize - 1) / 2;
		int end = isEven ? eraserSize / 2 : (eraserSize - 1) / 2 + 1;

		int centerCol = layer.getColumn(tileIndex);
		int centerRow = layer.getRow(tileIndex);

		for (int i = start; i < end; i++) {
			for (int j = start; j < end; j++) {
				int currentTileIndex = layer.getTileIndex(centerCol + i, centerRow + j);
				Rect2D* sprite = layer.getAtTileIndex(currentTileIndex);
				if (sprite != nullptr) {
					layer.remove(sprite);
				}
			}
		}
	}
}}