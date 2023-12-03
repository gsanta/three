#pragma once

#include "../src/editing/document/document.h"
#include "../src/editing/tool/context/tool_context.h"
#include "../src/editing/tool/tools/brush_tool/brush_tool.h"
#include "../src/editing/tool/tools/rectangle_tool/rectangle_tool.h"
#include "../src/editing/tool/tools/select_tool/select_tool.h"
#include "../src/maths/data/bounds_int.h"

using namespace spright::editing;

class CommonToolFuncs
{
public:
    CommonToolFuncs(Document &document, ToolContext &context);

    void buildRect(const BoundsInt &bounds);

    void createTile(const Vec2Int &pos, size_t layerIndex = 0, size_t frameIndex = 0);

    void setPrevCurrDown(const Vec2Int &pos);

    void setPrevCurrDown(const Vec2 &pos);

    void setCurr(const Vec2Int &pos);

    void selectTiles(const std::vector<Rect2D *> &tiles);

    void selectRect(const BoundsInt &bounds);

    void clickAtTilePos(const Vec2Int &pos, Tool &tool);

    void clickAtPos(const Vec2 &pos, Tool &tool);

private:
    Document &m_Document;

    ToolContext &m_Context;
};
