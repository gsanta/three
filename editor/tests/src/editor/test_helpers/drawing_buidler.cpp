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

DrawingBuilder &DrawingBuilder::withTileLayer()
{
    TileLayerBuilder builder;
    m_TileLayers.push_back(builder);

    return *this;
}

Drawing DrawingBuilder::build()
{
    Drawing drawing(m_Bounds, &TestDocumentFactory::eventEmitter);

    FrameImpl frame(0);

    TileLayer foregroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds);
    TileLayer backgroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, 2.0f);

    drawing.getFrameStore().addFrame(frame);
    drawing.getActiveFrame().addBackgroundLayer(backgroundLayer);
    drawing.getActiveFrame().addForegroundLayer(foregroundLayer);

    for (TileLayerBuilder &builder : m_TileLayers)
    {
        TileLayer layer = builder.build();
        drawing.addLayer(layer);
    }

    if (m_TileLayers.size() == 0)
    {
        drawing.addLayer(TileLayerBuilder().withBounds(m_Bounds).build());
    }

    return drawing;
}
