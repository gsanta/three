#include "resize_drawing.h"

namespace spright
{
namespace editing
{
    TileLayer resize_tile_layer(const TileLayer &orig, const Bounds &bounds, const DocumentFactory &documentFactory)
    {
        TileLayer newTileLayer = documentFactory.createTileLayer(orig.getName(), bounds, orig.getTileSize());
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

    Drawing resize_drawing(const Drawing &orig, const Bounds &bounds, const DocumentFactory &documentFactory)
    {
        CreateDrawingProps createDrawingProps(bounds);
        createDrawingProps.layerCount = 0;
        createDrawingProps.backgroundLayerTileSize = orig.getBackgroundLayer().getTileSize();
        Drawing newDrawing = documentFactory.createDrawing(createDrawingProps);

        std::vector<TileLayer> layers;

        for (const Frame &frame : orig.getFrames())
        {
            Frame newFrame(frame.getIndex());
            for (const TileLayer &layer : frame.getLayers())
            {
                TileLayer newLayer = resize_tile_layer(layer, bounds, documentFactory);
                layers.push_back(newLayer);
            }

            newDrawing.addFrame(layers);

            layers.clear();
        }

        return newDrawing;
    }
} // namespace editing
} // namespace spright
