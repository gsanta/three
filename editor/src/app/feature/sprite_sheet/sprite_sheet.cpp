#include "./sprite_sheet.h"

namespace spright
{
namespace editor
{

    SpriteSheet::SpriteSheet(std::shared_ptr<DocumentFactory> documentFactory, Document *document)
        : m_DocumentFactory(documentFactory), m_Document(document)
    {
    }

    void SpriteSheet::generateSpriteSheet(Drawing &drawing)
    {
        int frameCount = drawing.getFrames().size();

        float startX = drawing.getBounds().maxX + 2.0f;
        float endX = startX + (drawing.getBounds().getWidth() / 2.0f) * frameCount;
        float startY = drawing.getBounds().minY + drawing.getBounds().getHeight() / 2.0;
        float endY = drawing.getBounds().maxY;

        size_t layerCount = drawing.getFrame(0).getLayers().size();

        CreateDrawingProps spriteSheetProps(Bounds(startX, startY, endX, endY));
        spriteSheetProps.layerCount = layerCount;
        spriteSheetProps.tileSize = drawing.getActiveLayer().getTileSize() / 2.0f;
        spriteSheetProps.backgroundLayerTileSize = drawing.getBackgroundLayer().getTileSize() / 2.0f;

        Drawing spriteSheet = m_DocumentFactory->createDrawing(spriteSheetProps);

        float layerWidth = drawing.getActiveLayer().getTileBounds().getWidth();

        for (int frameIndex = 0; frameIndex < drawing.getFrames().size(); frameIndex++)
        {
            for (int layerIndex = 0; layerIndex < layerCount; layerIndex++)
            {
                TileLayer &sourceLayer = drawing.getFrames()[frameIndex].getLayer(layerIndex);
                TileLayer &destLayer = spriteSheet.getFrame(0).getLayer(layerIndex);
                BoundsInt bounds = sourceLayer.getTileBounds();
                tile_operation_copy_area(sourceLayer, destLayer, bounds, Vec2Int(frameIndex * layerWidth, 0));
            }
        }

        m_Document->addDrawing(spriteSheet);
    }
} // namespace editor
} // namespace spright
