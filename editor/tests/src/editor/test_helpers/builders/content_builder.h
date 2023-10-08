#pragma once

#include "../src/app/document/document.h"
#include "../src/app/tool/brush_tool.h"
#include "../src/app/tool/rectangle_tool/rectangle_tool.h"
#include "../src/app/tool/select_tool/select_tool.h"
#include "../src/app/tool/tool/tool_context.h"
#include "../src/engine/graphics/renderable/bounds_int.h"

using namespace ::spright::editor;

class ContentBuilder
{
public:
    ContentBuilder(Document &document, ToolContext &context);

    ContentBuilder &buildRect(const BoundsInt &bounds);

    ContentBuilder &buildTile(const Vec2Int &pos);

    ContentBuilder &setPrevCurrDown(const Vec2Int &pos);

    ContentBuilder &setCurr(const Vec2Int &pos);

    ContentBuilder &selectTiles(const std::vector<Rect2D *> &tiles);

    ContentBuilder &selectRect(const BoundsInt &bounds);

private:
    Document &m_Document;
    ToolContext &m_Context;
};
