#include "drawing_builder.h"

DrawingBuilder &DrawingBuilder::withBounds(Bounds bounds)
{
    m_Bounds = bounds;

    return *this;
}

DrawingBuilder &DrawingBuilder::withTileLayer(TileLayerBuilder props)
{
    m_TileLayers.push_back(props);

    return *this;
}

DrawingBuilder &DrawingBuilder::withTileSize(float tileSize)
{

    m_TileSize = tileSize;

    return *this;
}

DrawingBuilder &DrawingBuilder::withTileLayer()
{
    TileLayerBuilder builder;
    m_TileLayers.push_back(builder);

    return *this;
}

Drawing DrawingBuilder::build()
{
    Drawing drawing(m_Bounds, &TestDocumentFactory::eventEmitter);

    const FrameImpl frame(0);

    const TileLayer foregroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, m_TileSize);
    const TileLayer backgroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, 2.0f);

    drawing.getFrameStore().addFrame(frame);
    drawing.getActiveFrame().addBackgroundLayer(backgroundLayer);
    drawing.getActiveFrame().addForegroundLayer(foregroundLayer);

    for (TileLayerBuilder &builder : m_TileLayers)
    {
        const TileLayer layer = builder.withBounds(m_Bounds).withTileSize(m_TileSize).build();
        drawing.addLayer(layer);
    }

    if (m_TileLayers.empty())
    {
        drawing.addLayer(TileLayerBuilder().withTileSize(m_TileSize).withBounds(m_Bounds).build());
    }

    return drawing;
}
