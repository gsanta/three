#pragma once

namespace spright
{
namespace editor
{

    struct FloodFillRange
    {
        int startX;
        int endX;
        int y;

        FloodFillRange(int startX, int endX, int y);
    };
} // namespace editor
} // namespace spright
