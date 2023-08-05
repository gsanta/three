#pragma once

#include "flood_fill_range.h"

#include <stddef.h>
#include <vector>

namespace spright
{
namespace editor
{

    class FloodFillRangeQueue
    {
    private:
        std::vector<FloodFillRange> m_Ranges;

        size_t m_Head = 0;

    public:
        size_t getCount();
        void addToEnd(FloodFillRange range);
        FloodFillRange getFirst();
        FloodFillRange popFirst();
    };
} // namespace editor
} // namespace spright
