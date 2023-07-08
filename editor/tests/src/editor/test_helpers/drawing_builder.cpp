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

DrawingBuilder &DrawingBuilder::withFrame(FrameBuilder frameBuilder)
{
    m_Frames.push_back(frameBuilder);

    return *this;
}

DrawingBuilder &DrawingBuilder::withFrame(FrameBuilder frameBuilder, size_t repeat)
{
    for (size_t i = 0; i < repeat; i++)
    {
        m_Frames.push_back(frameBuilder);
    }

    return *this;
}


Drawing DrawingBuilder::build()
{
    if (m_TileLayers.size() > 0 && m_Frames.size() > 0)
    {
        throw "Either configure DrawingBuilder with LayerBuilders or FrameBuilders, but both are not allowed";
    }

    if (m_Frames.size() > 0)
    {
        return buildFromFrames();
    }

    return buildFromLayers();
}

Drawing DrawingBuilder::buildFromLayers()
{
    Drawing drawing(m_Bounds);

    const Frame frame(0);

    const TileLayer foregroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, m_TileSize);
    const TileLayer backgroundLayer("", Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, 2.0f);

    drawing.addFrame(frame);
    drawing.addBackgroundLayer(backgroundLayer);
    drawing.addForegroundLayer(foregroundLayer);

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

Drawing DrawingBuilder::buildFromFrames()
{
    Drawing drawing(m_Bounds);

    for (FrameBuilder &frameBuilder : m_Frames)
    {
        drawing.addFrame(frameBuilder.build());
    }

    return drawing;
}
