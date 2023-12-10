#pragma once

#include "../src/editing/tool/tools/brush_tool/brush.h"
#include "../src/engine/graphics/colors.h"
#include "../src/engine/graphics/mesh/meshes/rect2d.h"
#include "../src/engine/scene/containers/tile_layer.h"

using namespace ::spright::engine;
using namespace spright::editing;

class TileBuilder
{
public:
    TileBuilder(TileLayer &tileLayer);

    TileBuilder &withPos(Vec2Int pos);

    TileBuilder &withColor(int color);

    Rect2D build();

private:
    Vec2Int m_Pos;

    int m_Color = COLOR_RED;

    TileLayer &m_TileLayer;
};
