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

DrawingBuilder &DrawingBuilder::withBackgroundLayerTileSize(float tileSize)
{
    m_BackgroundLayerTileSize = tileSize;

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

    Drawing drawing = m_Frames.size() > 0 ? buildFromFrames() : buildFromLayers();

    // if (m_Frames.size() > 0)
    // {
    //     drawing = buildFromFrames();
    // } else {
    //     drawing = buildFromLayers();
    // }

    Checkerboard checkerboard;
    checkerboard.create(drawing.getBackgroundLayer());

    return drawing;
}

Drawing DrawingBuilder::buildFromLayers()
{

    TileLayer initialLayer = m_TileLayers.empty()
                                 ? TileLayerBuilder().withTileSize(m_TileSize).withBounds(m_Bounds).build()
                                 : m_TileLayers[0].withBounds(m_Bounds).withTileSize(m_TileSize).build();

    std::shared_ptr<Renderer2D> renderer = std::make_shared<HeadlessRenderer2D>();

    TileLayer backgroundLayer = TileLayerBuilder().withTileSize(m_BackgroundLayerTileSize).withBounds(m_Bounds).build();
    const TileLayer tempLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, initialLayer.getZPos());
    const TileLayer toolLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, 0, true);
    const TileLayer cursorLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, 0, true);

    Drawing drawing(initialLayer, backgroundLayer, tempLayer, toolLayer, cursorLayer, Layer(renderer));

    for (size_t i = 1; i < m_TileLayers.size(); i++)
    {
        const TileLayer layer = m_TileLayers[i].withBounds(m_Bounds).withTileSize(m_TileSize).build();
        drawing.addLayer(layer);
    }

    return drawing;
}

Drawing DrawingBuilder::buildFromFrames()
{
    TileLayer backgroundLayer = TileLayerBuilder().withTileSize(m_BackgroundLayerTileSize).withBounds(m_Bounds).build();

    std::shared_ptr<Renderer2D> renderer = std::make_shared<HeadlessRenderer2D>();

    const TileLayer tempLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, 0);
    const TileLayer toolLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, 0, true);
    const TileLayer cursorLayer("", renderer, Group<Rect2D>(), m_Bounds, m_TileSize, 0, true);

    std::vector<Frame> frames;

    for (FrameBuilder &frameBuilder : m_Frames)
    {
        frames.push_back(frameBuilder.build());
    }

    Drawing drawing(frames[0].getLayers()[0].getBounds(),
                    backgroundLayer,
                    tempLayer,
                    toolLayer,
                    cursorLayer,
                    Layer(renderer));

    for (Frame &frame : frames)
    {
        std::vector<TileLayer> layers;

        for (TileLayer &layer : frame.getLayers())
        {
            layers.push_back(layer);
        }

        drawing.addFrame(layers);
    }

    TileLayer foregroundLayer = TileLayerBuilder().withTileSize(m_TileSize).withBounds(m_Bounds).build();

    return drawing;
}
