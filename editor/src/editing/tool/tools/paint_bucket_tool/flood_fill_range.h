#pragma once

namespace spright
{
namespace editing
{

    struct FloodFillRange
    {
        int startX;
        int endX;
        int y;

        FloodFillRange(int startX, int endX, int y);
    };
} // namespace editing
} // namespace spright
