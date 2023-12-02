#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/graphics/mesh/meshes/renderable2d.h"
#include "../../../../engine/scene/containers/tile_layer.h"
#include "../../../../maths/vec2.h"
#include "../../../utils/declarations.h"
#include "flood_fill_range.h"
#include "flood_fill_range_queue.h"

#include <algorithm>
#include <set>

namespace spright
{
namespace editing
{
    using namespace ::spright::maths;
    using namespace ::spright::engine;

    struct FloodFillData
    {
        int width;
        int height;
    };

    class QueueLinearFloodFill
    {
    private:
        FloodFillData m_Data;
        FloodFillRangeQueue m_Queue;
        std::set<int> m_VisitedIndexes;
        bool m_IsEmptyTile;
        int m_SourceColor;

    public:
        void floodFill(TileLayer &layer,
                       int x,
                       int y,
                       int color,
                       const onRect2DCreate &operation = defaultRect2DCreate);

    private:
        void linearFill(TileLayer &layer, int x, int y, int color, const onRect2DCreate &operation);
        bool checkPoint(TileLayer &layer, int x, int y, int color);
        bool isPixelWithinColorTolerance(TileLayer &layer, int tileIndex);
        void setColor(TileLayer &layer, int x, int y, int color, const onRect2DCreate &operation);
    };
} // namespace editing
} // namespace spright
