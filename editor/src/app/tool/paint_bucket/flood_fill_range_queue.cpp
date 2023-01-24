#include "flood_fill_range_queue.h"

namespace spright {
	size_t FloodFillRangeQueue::getCount()
	{
		return m_Ranges.size();
	}

	void FloodFillRangeQueue::addToEnd(FloodFillRange range)
	{
		m_Ranges.push_back(range);
	}

	FloodFillRange FloodFillRangeQueue::getFirst()
	{
		return m_Ranges[0];
	}

	FloodFillRange FloodFillRangeQueue::popFirst()
	{
		FloodFillRange first = m_Ranges[0];
		m_Ranges.erase(m_Ranges.begin());

		return first;
	}
}