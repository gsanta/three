#include "test_document_factory.h"

std::vector<TileLayer> TestDocumentFactory::createTileLayers(size_t num)
{
    std::vector<TileLayer> layers;

    std::shared_ptr<Renderer2D> renderer = std::make_shared<HeadlessRenderer2D>();

    for (int i = 0; i < num; i++)
    {
        TileLayer layer("layer_" + std::to_string(i),
                        renderer,
                        Group<Rect2D>(),
                        Bounds::createWithPositions(-3.0f, -3.0f, 3.0f, 3.0f),
                        1.0f);

        layers.push_back(layer);
    }

    return layers;
}

TileLayer TestDocumentFactory::createTileLayer(size_t index, float tileSize, Bounds bounds)
{
    std::shared_ptr<Renderer2D> renderer = std::make_shared<HeadlessRenderer2D>();

    TileLayer layer("layer_" + std::to_string(index), renderer, Group<Rect2D>(), bounds, tileSize);

    return layer;
}

DocumentFactory TestDocumentFactory::createDocumentFactory(Window &window)
{
    return DocumentFactory(&window, new HeadlessRendererProvider());
}
