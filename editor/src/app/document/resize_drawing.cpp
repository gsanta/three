#include "resize_drawing.h"

namespace spright
{
namespace editor
{
    TileLayer resize_tile_layer(const TileLayer &orig, const Bounds &bounds, DocumentFactory *documentFactory)
    {
        TileLayer newTileLayer = documentFactory->createTileLayer(orig.getName(), bounds, orig.getTileSize());
        for (Rect2D *rect : orig.getTiles())
        {
            Vec2 rectCenter = rect->getCenterPosition2d();
            if (newTileLayer.getBounds().contains(rectCenter.x, rectCenter.y))
            {
                newTileLayer.add(*rect);
            }
        }

        return newTileLayer;
    }

    Drawing resize_drawing(const Drawing &orig, const Bounds &bounds, DocumentFactory *documentFactory)
    {
        std::vector<Frame> frames;

        for (const Frame &frame : orig.getFrames())
        {
            Frame newFrame(frame.getIndex());
            for (const TileLayer &layer : frame.getLayers())
            {
                TileLayer newLayer = resize_tile_layer(layer, bounds, documentFactory);
                newFrame.addLayer(newLayer);
            }

            frames.push_back(std::move(newFrame));
        }

        CreateDrawingProps createDrawingProps(bounds);
        createDrawingProps.hasInitialLayer = false;
        createDrawingProps.backgroundLayerTileSize = orig.getBackgroundLayer().getTileSize();
        Drawing newDrawing = documentFactory->createDrawing(createDrawingProps);

        for (Frame &frame : frames)
        {
            newDrawing.addFrame(frame);
        }

        return newDrawing;
    }
} // namespace editor
} // namespace spright
