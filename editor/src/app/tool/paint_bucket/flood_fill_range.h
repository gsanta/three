#pragma once

namespace spright {
	
	struct FloodFillRange {
		int startX;
		int endX;
		int y;

		FloodFillRange(int startX, int endX, int y);
	};
}