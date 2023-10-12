#pragma once

#include "../src/app/core/colors.h"
#include "../src/app/tool/tools/brush_tool/brush.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/rect2d.h"

using namespace ::spright::engine;
using namespace ::spright::editor;

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
