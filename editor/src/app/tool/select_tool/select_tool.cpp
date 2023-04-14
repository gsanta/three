#include "select_tool.h"

namespace spright
{
namespace editor
{

    SelectTool::SelectTool(DocumentStore *documentStore) : m_DocumentStore(documentStore), Tool("select")
    {
    }

    void SelectTool::pointerDown(ToolContext &context)
    {
        if (context.doc.hasActiveDrawing())
        {
            m_SelectionBox.setTileLayer(context.doc.activeDrawing->getForegroundLayer());
            m_IsMove = m_SelectionBox.isInsideSelection(context.pointer.curr);

            if (!m_IsMove)
            {
                m_SelectionBox.start(context.pointer.curr);
            }
        }
    }

    void SelectTool::pointerUp(ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        if (Vec2::distance(context.pointer.down, context.pointer.curr) < m_NoMovementTolerance)
        {
            makePointSelection(context);
        }
        else
        {
            makeSelection(context);
        }

        m_IsMove = false;
    }

    void SelectTool::pointerMove(ToolContext &context)
    {
        if (!context.pointer.isLeftButtonDown())
        {
            return;
        }

        if (m_IsMove)
        {
            Vec2 delta = m_SelectionBox.move(context.pointer.curr - context.pointer.prev);
            moveSelection(delta, context.doc.activeDrawing);
        }
        else
        {
            m_SelectionBox.setPosition(context.pointer.curr);
        }
    }

    void SelectTool::makeSelection(ToolContext &context)
    {
        m_Data.clear();
        m_OrigPositions.clear();

        if (!context.doc.activeDrawing)
        {
            return;
        }

        Vec2 down = context.pointer.down;
        Vec2 curr = context.pointer.curr;

        float startX = down.x < curr.x ? down.x : curr.x;
        float endX = down.x < curr.x ? curr.x : down.x;
        float startY = down.y < curr.y ? down.y : curr.y;
        float endY = down.y < curr.y ? curr.y : down.y;
        Bounds selectionBounds = Bounds::createWithPositions(startX, endX, startY, endY);

        TileLayer &layer = context.doc.activeDrawing->getActiveLayer();

        auto it = layer.getRenderables().begin();
        while (it != layer.getRenderables().end())
        {
            Vec2 pos = (*it)->getCenterPosition2d();

            if (selectionBounds.contains(pos.x, pos.y))
            {
                Rect2D *sprite = static_cast<Rect2D *>(*it);
                m_Data.push_back(sprite);
                m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
            }
            ++it;
        }
    }

    void SelectTool::moveSelection(Vec2 tileDelta, Drawing *activeDrawing)
    {
        if (activeDrawing == nullptr)
        {
            return;
        }

        TileLayer &tileLayer = activeDrawing->getActiveLayer();

        for (int i = 0; i < m_Data.size(); i++)
        {
            Rect2D *sprite = m_Data[i];

            sprite->translate(tileDelta);
        }

        for (Rect2D *sprite : m_Data)
        {
            Vec2Int tilePos = tileLayer.getTilePos(sprite->getPosition2d());
            int newTileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
            tileLayer.updateTileIndex(sprite, newTileIndex);
        }
    }

    void SelectTool::makePointSelection(ToolContext &context)
    {
        if (!context.doc.activeDrawing)
        {
            return;
        }
        TileLayer &tileLayer = context.doc.activeDrawing->getActiveLayer();
        Camera &camera = m_DocumentStore->getActiveDocument().getCamera();
        Vec2 model = camera.screenToModel(context.pointer.curr);

        Vec2Int tilePos = tileLayer.getTilePos(model);
        int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
        Renderable2D *renderable = tileLayer.getAtTileIndex(tileIndex);

        if (renderable != nullptr)
        {
            Rect2D *sprite = static_cast<Rect2D *>(renderable);
            m_Data.push_back(sprite);
            m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));

            Vec2 spritePos = sprite->getPosition2d();
            float tileSize = tileLayer.getTileSize();
        }
    }
} // namespace editor
} // namespace spright
