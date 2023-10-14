#include "select_tool.h"

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
        m_SelectionMover = std::make_unique<SelectionMover>();
    }

    void SelectTool::pointerDown(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        int tileIndex = tempLayer.getTileIndex(context.pointer.curr);

        m_Phase = tempLayer.getAtTileIndex(tileIndex) == nullptr ? selection : manipulation;

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

        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
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

    void SelectTool::pointerUp(const ToolContext &context)
    {
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        recalcTileIndexesAndBounds(activeLayer, tempLayer);

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
        if (m_Mode == manip_rotate)
        {
            context.tools->getRotateTool().pointerDown(context);
        }
        else if (m_Mode == manip_shear)
        {
            context.tools->getShearTool().pointerDown(context);
        }
    }

    void SelectTool::moveManipulation(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

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
            m_SelectionMover->move(tempLayer, context.pointer.curr, context.pointer.prev, context.pointer.down);

            m_SelectionMover->move(activeLayer,
                                   m_SelectionBuffer.getTileIndexes(),
                                   context.pointer.curr,
                                   context.pointer.prev,
                                   context.pointer.down);
            break;
        }
    }

    void SelectTool::endManipulation(const ToolContext &context)
    {
        if (m_Mode == manip_rotate)
        {
            context.tools->getRotateTool().pointerUp(context);
        }
        else if (m_Mode == manip_shear)
        {
            context.tools->getShearTool().pointerUp(context);
        }
    }

    void SelectTool::startSelection(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

        m_SelectionBuffer.clear();
        tempLayer.clear();
    }

    void SelectTool::moveSelection(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_SelectionType == rectangle)
        {
            if (!m_BoxSelector.isSelectionChanged(tempLayer,
                                                  context.pointer.curr,
                                                  context.pointer.prev,
                                                  context.pointer.down))
            {
                return;
            }

            tempLayer.clear();
            m_BoxSelector.select(activeLayer, tempLayer, context.pointer.curr, context.pointer.down);
        }
        else if (m_SelectionType == wand)
        {
            // no op
        }
    }

    void SelectTool::endSelection(const ToolContext &context)
    {
        TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

        if (m_SelectionType == wand)
        {
            m_WandSelector.select(activeLayer, tempLayer, context.pointer.curr, context.pointer.down);
        }
        else if (context.pointer.downDelta().length() < m_NoMovementTolerance)
        {
            TileLayer &tempLayer = context.doc.activeDrawing->getTempLayer();

            tempLayer.clear();
            m_SelectionBuffer.clear();
        }
    }

    void SelectTool::setMode(SelectionManipulationMode mode)
    {
        m_Mode = mode;
    }

    void SelectTool::setSelectionType(SelectionType selectionType)
    {
        m_SelectionType = selectionType;
    }

    void SelectTool::setSelection(const std::vector<int> &indexes, Drawing &drawing)
    {
        TileLayer &activeLayer = drawing.getActiveLayer();
        TileLayer &tempLayer = drawing.getTempLayer();

        m_SelectionBuffer.setTileIndexes(indexes, activeLayer);

        const BoundsInt &bounds = m_SelectionBuffer.getTileBounds();

        m_BoxSelector.select(activeLayer,
                             tempLayer,
                             tempLayer.getCenterPos(bounds.getBottomLeft()),
                             tempLayer.getCenterPos(bounds.getTopRight() + -1));
    }

    void SelectTool::recalcTileIndexesAndBounds(TileLayer &activeLayer, TileLayer &tempLayer)
    {
        std::vector<int> currentTileIndexes = m_SelectionBuffer.getTileIndexes();
        std::vector<int> newTileIndexes;

        for (int tileIndex : m_SelectionBuffer.getTileIndexes())
        {
            Rect2D *tile = activeLayer.getAtTileIndex(tileIndex);
            if (tile != nullptr)
            {
                newTileIndexes.push_back(activeLayer.updateTileIndex(tile));
            }
        }

        m_SelectionBuffer.setTileIndexes(newTileIndexes, activeLayer);

        for (Rect2D *tile : tempLayer.getTiles())
        {
            tempLayer.updateTileIndex(tile);
        }
    }

    SelectionBuffer &SelectTool::getSelectionBuffer()
    {
        return m_SelectionBuffer;
    }
} // namespace editor
} // namespace spright
