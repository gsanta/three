#pragma once
#include <algorithm>
#include <vector>

namespace spright
{
namespace editor
{

    class SelectionBuffer
    {
    public:
        void add(int tileIndex);

        void clear();

        const std::vector<int> &getTileIndexes();

        void setTileIndexes(std::vector<int> indexes);

        bool containsIndex(int index);

    private:
        std::vector<int> m_TileIndexes;
    };
} // namespace editor
} // namespace spright
