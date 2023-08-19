#pragma once
#include "../src/app/document/document.h"
#include "../src/app/document/document_store.h"
#include "../src/app/document/factory/document_factory.h"
#include "../src/app/document/factory/headless_renderer_provider.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "test_event_emitter.h"

#include <vector>

using namespace ::spright::engine;
using namespace ::spright::editor;

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
