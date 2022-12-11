#pragma once

namespace spright_app {
	
	struct FloodFillRange {
		int startX;
		int endX;
		int y;

		FloodFillRange(int startX, int endX, int y);
	};
}