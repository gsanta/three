#include "frame_builder.h"

FrameBuilder &FrameBuilder::withFrameIndex(size_t index)
{
    m_Index = index;

    return *this;
}

FrameBuilder &FrameBuilder::withTileLayer(TileLayerBuilder tileLayerBuilder)
{
    m_TileLayers.push_back(tileLayerBuilder);

    return *this;
}

Frame FrameBuilder::build()
{

    Frame frame(m_Index);

    for (TileLayerBuilder &layerBuilder : m_TileLayers)
    {
        frame.addLayer(layerBuilder.build());
    }

    return frame;
}
