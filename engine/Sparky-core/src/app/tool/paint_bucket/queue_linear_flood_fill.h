#pragma once

#include "flood_fill_range_queue.h"
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright_app {

	//type FillerData = {
 // width: number;

 // height: number;

 // pixels: number[];

 // point: Point;

 // targetColor: number;

 // replacementColor: number;

 // selectionThreshold ? : number;
	//};

	using namespace spright_engine::graphics;


	struct FloodFillData {
		int width;
		int height;

	};

	class QueueLinearFloodFill {
	private:
		FloodFillData m_Data;
		FloodFillRangeQueue m_Queue;
	public:
		void floodFill(TileLayer layer);
	private:
		void linearFill(TileLayer* layer, int x, int y, int color);
		void checkPoint(TileLayer* layer, int x, int y);
	};

}