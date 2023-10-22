#include "select_tool.h"

#include "../move_tool/move_tool.h"
#include "../rotate_tool/rotate_tool.h"
#include "../shear_tool/shear_tool.h"

namespace spright
{
namespace editor
{
    SelectTool::SelectTool()
        : Tool("select", std::make_shared<RectangleCursor>(1)), m_BoxSelector(m_SelectionBuffer),
          m_WandSelector(m_SelectionBuffer)
    {
    }

    void SelectTool::pointerDown(const ToolContext &context)
    {
        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();

        int tileIndex = toolLayer.getTileIndex(context.pointer.curr);

        m_Phase = toolLayer.getAtTileIndex(tileIndex) == nullptr ? selection : manipulation;

        if (m_Phase == selection)
        {
            startSelection(context);
        }
        else
        {
            startManipulation(context);
        }
    }

    void SelectTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown)
        {
            return;
        }

        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_Phase == selection)
        {
            moveSelection(context);
        }
        else
        {
            moveManipulation(context);
        }
    }

    void SelectTool::pointerUp( ToolContext &context)
    {
        if (m_Phase == selection)
        {
            endSelection(context);
        }
        else
        {
            endManipulation(context);
        }

        m_Phase = selection;
    }

    void SelectTool::startManipulation(const ToolContext &context)
    {
        switch (m_Mode)
        {
        case manip_rotate:
            context.tools->getRotateTool().pointerDown(context);
            break;
        case manip_shear:
            context.tools->getShearTool().pointerDown(context);
            break;
        case manip_move:
        default:
            context.tools->getMoveTool().pointerDown(context);
            break;
        }
    }

    void SelectTool::moveManipulation(const ToolContext &context)
    {
        switch (m_Mode)
        {
        case manip_rotate:
            context.tools->getRotateTool().pointerMove(context);
            break;
        case manip_shear:
            context.tools->getShearTool().pointerMove(context);
            break;
        case manip_move:
        default:
            context.tools->getMoveTool().pointerMove(context);
            break;
        }
    }

    void SelectTool::endManipulation(ToolContext &context)
    {
        switch (m_Mode)
        {
        case manip_rotate:
            context.tools->getRotateTool().pointerUp(context);
            break;
        case manip_shear:
            context.tools->getShearTool().pointerUp(context);
            break;
        case manip_move:
        default:
            context.tools->getMoveTool().pointerUp(context);
            break;
        }
    }

    void SelectTool::startSelection(const ToolContext &context)
    {
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayerOfActiveLayer();

        tile_operation_copy_all(tempLayer, activeLayer);

        m_SelectionBuffer.clear();
        toolLayer.clear();
        tempLayer.clear();
    }

    void SelectTool::moveSelection(const ToolContext &context)
    {
        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_SelectionType == rectangle)
        {
            if (!m_BoxSelector.isSelectionChanged(toolLayer,
                                                  context.pointer.curr,
                                                  context.pointer.prev,
                                                  context.pointer.down))
            {
                return;
            }

            toolLayer.clear();
            m_BoxSelector.select(activeLayer, toolLayer, context.pointer.curr, context.pointer.down);
        }
        else if (m_SelectionType == wand)
        {
            // no op
        }
    }

    void SelectTool::endSelection(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayerOfActiveLayer();
        TileLayer &toolLayer = context.doc.activeDrawing->getToolLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_SelectionType == wand)
        {
            m_WandSelector.select(activeLayer, toolLayer, context.pointer.curr, context.pointer.down);
        }

        m_SelectionBuffer.recalcTileIndexesAndBounds(activeLayer, toolLayer);

        tile_operation_copy_indexes(activeLayer, tempLayer, m_SelectionBuffer.getTileIndexes());
        tile_operation_remove_indexes(activeLayer, m_SelectionBuffer.getTileIndexes());
    }

    void SelectTool::setMode(SelectionManipulationMode mode)
    {
        m_Mode = mode;
    }

    void SelectTool::setSelectionType(SelectionType selectionType)
    {
        m_SelectionType = selectionType;
    }

    void SelectTool::syncSelection(Drawing &drawing, const std::vector<int> &tileIndexes)
    {
        TileLayer &toolLayer = drawing.getToolLayer();
        TileLayer &tempLayer = drawing.getTempLayerOfActiveLayer();

        m_SelectionBuffer.setTileIndexes(tileIndexes, tempLayer);

        const BoundsInt &bounds = m_SelectionBuffer.getTileBounds();

        m_BoxSelector.select(tempLayer,
                             toolLayer,
                             toolLayer.getCenterPos(bounds.getBottomLeft()),
                             toolLayer.getCenterPos(bounds.getTopRight() + -1));
    }

    void SelectTool::setSelection(const std::vector<int> &indexes, Drawing &drawing, TileLayer &layer)
    {
        TileLayer &toolLayer = drawing.getToolLayer();
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayerOfActiveLayer();

        m_SelectionBuffer.setTileIndexes(indexes, layer);

        const BoundsInt &bounds = m_SelectionBuffer.getTileBounds();

        m_BoxSelector.select(layer,
                             toolLayer,
                             toolLayer.getCenterPos(bounds.getBottomLeft()),
                             toolLayer.getCenterPos(bounds.getTopRight() + -1));

        tile_operation_copy_indexes(activeLayer, tempLayer, m_SelectionBuffer.getTileIndexes());
        tile_operation_remove_indexes(activeLayer, m_SelectionBuffer.getTileIndexes());
    }

    SelectionBuffer &SelectTool::getSelectionBuffer()
    {
        return m_SelectionBuffer;
    }
} // namespace editor
} // namespace spright
