#include "./common_tool_funcs.h"

#include "../src/editing/utils/conversions.h"


CommonToolFuncs::CommonToolFuncs(Document &document, ToolContext &context) : m_Document(document), m_Context(context)
{
}

void CommonToolFuncs::buildRect(const BoundsInt &bounds)
{
    TileLayer &activeLayer = m_Context.doc.activeDrawing->getActiveLayer();
    Vec2 start = activeLayer.getCenterPos(bounds.getBottomLeft());

    m_Context.pointer.curr = m_Context.pointer.down = m_Context.pointer.prev = start;
    m_Context.pointer.isDown = true;

    RectangleTool rectTool;
    rectTool.setFilled(true);

    rectTool.execPointerDown(m_Context);

    m_Context.pointer.curr = activeLayer.getCenterPos(bounds.getTopRight());

    rectTool.execPointerMove(m_Context);
    rectTool.execPointerUp(m_Context);
}

void CommonToolFuncs::createTile(const Vec2Int &pos, size_t layerIndex, size_t frameIndex)
{
    TileCanvas &drawing = get_active_tile_canvas(m_Document);

    drawing.setActiveFrame(frameIndex);
    drawing.setActiveLayer(layerIndex);

    TileLayer &activeLayer = m_Context.doc.activeDrawing->getActiveLayer();

    BrushTool brushTool;

    m_Context.pointer.curr = m_Context.pointer.down = m_Context.pointer.prev = activeLayer.getCenterPos(pos);

    brushTool.execPointerDown(m_Context);
    brushTool.execPointerUp(m_Context);
}

void CommonToolFuncs::setPrevCurrDown(const Vec2Int &pos)
{
    m_Context.pointer.curr = m_Context.pointer.prev = m_Context.pointer.down =
        m_Context.doc.activeDrawing->getActiveLayer().getCenterPos(pos);

    m_Context.pointer.isDown = true;
}

void CommonToolFuncs::setPrevCurrDown(const Vec2 &pos)
{
    m_Context.pointer.curr = m_Context.pointer.prev = m_Context.pointer.down = pos;

    m_Context.pointer.isDown = true;
}

void CommonToolFuncs::setCurr(const Vec2Int &pos)
{
    m_Context.pointer.curr = m_Context.doc.activeDrawing->getActiveLayer().getCenterPos(pos);
}

void CommonToolFuncs::setScroll(const Vec2 &scroll)
{
    m_Context.pointer.scroll = scroll;
}

void CommonToolFuncs::selectTiles(const std::vector<Rect2D *> &tiles)
{
    TileLayer &activeLayer = m_Context.doc.activeDrawing->getActiveLayer();

    vector<int> tileIndexes;
    for (Rect2D *rect : tiles)
    {
        tileIndexes.push_back(activeLayer.getTileIndex(rect->getCenterPosition2d()));
    }

    m_Context.tools->getSelectTool().setSelection(tileIndexes,
                                                  *m_Context.doc.activeDrawing,
                                                  m_Context.doc.activeDrawing->getTempLayerOfActiveLayer());
}

void CommonToolFuncs::selectRect(const BoundsInt &bounds)
{
    TileLayer &activeLayer = m_Context.doc.activeDrawing->getActiveLayer();
    Vec2 start = activeLayer.getCenterPos(bounds.getBottomLeft());

    m_Context.pointer.curr = m_Context.pointer.down = m_Context.pointer.prev = start;
    m_Context.pointer.isDown = true;

    SelectTool &selectTool = m_Context.tools->getSelectTool();

    selectTool.execPointerDown(m_Context);

    m_Context.pointer.curr = activeLayer.getCenterPos(bounds.getTopRight());

    selectTool.execPointerMove(m_Context);
    selectTool.execPointerUp(m_Context);
}

void CommonToolFuncs::clickAtTilePos(const Vec2Int &pos, Tool &tool)
{
    setPrevCurrDown(pos);
    tool.execPointerDown(m_Context);
    tool.execPointerUp(m_Context);
}

void CommonToolFuncs::clickAtPos(const Vec2 &pos, Tool &tool)
{
    setPrevCurrDown(pos);
    tool.execPointerDown(m_Context);
    tool.execPointerUp(m_Context);
}
