#pragma once
#include "../src/app/document/frame_impl.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "test_document_factory.h"
#include "tile_layer_builder.h"

#include <vector>

using namespace spright::editor;

class FrameBuilder
{
public:
    FrameBuilder &withFrameIndex(size_t);

    FrameBuilder &withTileLayer(TileLayerBuilder);

    FrameImpl build();

private:
    std::vector<TileLayerBuilder> m_TileLayers;

    size_t m_Index;
};
