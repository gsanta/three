#pragma once
#include "../src/engine/scene/containers/frame.h"
#include "../src/maths/data/bounds.h"
#include "tile_layer_builder.h"

#include <vector>

using namespace spright::editing;

class FrameBuilder
{
public:
    FrameBuilder &withFrameIndex(size_t);

    FrameBuilder &withTileLayer(TileLayerBuilder);

    Frame build();

private:
    std::vector<TileLayerBuilder> m_TileLayers;

    size_t m_Index;
};
