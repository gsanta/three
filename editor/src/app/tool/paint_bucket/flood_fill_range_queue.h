#pragma once

#include "flood_fill_range.h"
#include <vector>
#include <stddef.h>

namespace spright {

	class FloodFillRangeQueue {
	private:
		std::vector<FloodFillRange> m_Ranges;

		size_t m_Head = 0;
	
	public:
		size_t getCount();
		void addToEnd(FloodFillRange range);
		FloodFillRange getFirst();
		FloodFillRange popFirst();
	};

}
