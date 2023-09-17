#include "document_factory.h"

namespace spright
{
namespace editor
{

    DocumentFactory::DocumentFactory(Window *window, RendererProvider *rendererProvider)
        : m_Window(window), m_RendererProvider(rendererProvider)
    {
    }

    DocumentFactory::DocumentFactory(const DocumentFactory &other)
    {
        m_RendererProvider = other.m_RendererProvider->clone();
    }

    DocumentFactory::~DocumentFactory()
    {
        delete m_RendererProvider;
    }

    TileLayer DocumentFactory::createUserLayer(const Bounds &bounds, std::string name, float tileSize) const
    {
        return TileLayer(name, *m_RendererProvider->createRenderer2D(), Group<Rect2D>(), bounds, tileSize);
    }

    TileLayer DocumentFactory::createTileLayer(std::string name, const Bounds &bounds, float tileSize)
    {
        TileLayer tileLayer("",
                            *m_RendererProvider->createRenderer2D(),
                            Group<Rect2D>(),
                            bounds,
                            tileSize,
                            m_TileLayerZPos);

        return tileLayer;
    }


    TileLayer DocumentFactory::createBackgroundLayer(const Bounds &bounds, float tileSize) const
    {
        TileLayer backgroundLayer("",
                                  *m_RendererProvider->createRenderer2D(),
                                  Group<Rect2D>(),
                                  bounds,
                                  tileSize,
                                  m_BackgroundZPos);

        Checkerboard checkerboard;
        checkerboard.create(backgroundLayer);

        return backgroundLayer;
    }

    TileLayer DocumentFactory::createTempLayer(const Bounds &bounds, float tileSize) const
    {
        return TileLayer("",
                         *m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_ForegroundZPos,
                         true);
    }

    TileLayer DocumentFactory::createCursorLayer(const Bounds &bounds, float tileSize) const
    {
        return TileLayer("",
                         *m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_ForegroundZPos,
                         true);
    }

    void DocumentFactory::createFrame(Document &document)
    {
        Frame frame(0);

        Frame &activeFrame = document.getActiveFrame();

        for (TileLayer &layer : activeFrame.getLayers())
        {
            frame.addLayer(layer);
        }

        document.getActiveDrawing().addFrame(std::move(frame));
    }

    Drawing DocumentFactory::createDrawing(std::vector<Frame> &frames, bool checkerboard) const
    {
        TileLayer &aLayer = frames[0].getLayers()[0];

        float tileSize = TileLayer::defaultTileSize;

        Drawing drawing(frames,
                        createBackgroundLayer(aLayer.getBounds(), aLayer.getTileSize()),
                        createTempLayer(aLayer.getBounds(), aLayer.getTileSize()),
                        createCursorLayer(aLayer.getBounds(), aLayer.getTileSize()));


        if (checkerboard)
        {
            m_Checkerboard.create(drawing.getBackgroundLayer());
        }

        return drawing;
    }

    Drawing DocumentFactory::createEmptyDrawing(Bounds bounds, bool checkerboard) const
    {
        std::vector<Frame> frames;

        Frame frame(0);

        frames.push_back(frame);

        float tileSize = TileLayer::defaultTileSize;

        return Drawing(frames,
                       createBackgroundLayer(bounds, tileSize),
                       createTempLayer(bounds, tileSize),
                       createCursorLayer(bounds, tileSize));
    }

    Drawing DocumentFactory::createDrawing(Bounds bounds, bool checkerboard, float zPos) const
    {
        TileLayer initialLayer("layer1", *m_RendererProvider->createRenderer2D(), Group<Rect2D>(), bounds, 0.5f, zPos);

        std::vector<Frame> frames;

        Frame frame(0);

        frame.addLayer(initialLayer);
        frames.push_back(frame);

        return createDrawing(frames, checkerboard);
    }

    Document DocumentFactory::createEmptyDocument() const
    {
        float pixelCount = 32.0f;
        Bounds drawingBounds =
            Bounds::createWithPositions(-pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f, pixelCount / 2.0f);

        Camera camera(m_Window, -1.0f, 1.0f);

        Document document(drawingBounds,
                          camera,
                          createDrawing(drawingBounds, false, 0.01f),
                          std::make_shared<DocumentHistory>());

        return document;
    }

    Document DocumentFactory::createDocument()
    {
        float pixelCount = 32.0f;

        Document document = createEmptyDocument();

        document.addDrawing(
            createDrawing(Bounds::createWithPositions(-16.0f, -pixelCount / 2.0f, 16.0f, pixelCount / 2.0f),
                          true,
                          m_TileLayerZPos));

        return document;
    }
} // namespace editor
} // namespace spright
