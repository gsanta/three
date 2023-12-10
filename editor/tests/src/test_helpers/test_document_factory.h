#pragma once
#include "../src/editing/document/document.h"
#include "../src/editing/document/document_store.h"
#include "../src/editing/document/factory/document_factory.h"
#include "../src/editing/document/factory/headless_renderer_provider.h"
#include "../src/engine/graphics/renderer/headless/headless_renderer2d.h"
#include "../src/engine/scene/containers/tile_layer.h"
#include "../src/maths/data/bounds.h"
#include "test_event_emitter.h"

#include <vector>

using namespace ::spright::engine;
using namespace spright::editing;

class TestDocumentFactory
{
public:
    static TestEventEmitter eventEmitter;
    static std::vector<TileLayer> createTileLayers(size_t num);
    static TileLayer createTileLayer(size_t index,
                                     float tileSize = TileLayer::defaultTileSize,
                                     Bounds bounds = Bounds::createWithPositions(-3.0f, -3.0f, 3.0f, 3.0f));
    static DocumentFactory createDocumentFactory(Window &window);
};
