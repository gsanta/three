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
        return TileLayer(name, Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, tileSize);
    }

    TileLayer DocumentFactory::createTileLayer(std::string name, const Bounds &bounds, float tileSize)
    {
        TileLayer tileLayer("",
                            Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                            bounds,
                            tileSize,
                            m_TileLayerZPos);

        return tileLayer;
    }


    TileLayer DocumentFactory::createBackgroundLayer(const Bounds &bounds, float tileSize)
    {
        TileLayer backgroundLayer("",
                                  Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                                  bounds,
                                  tileSize,
                                  m_BackgroundZPos);

        Checkerboard checkerboard;
        checkerboard.create(backgroundLayer);

        return backgroundLayer;
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

        TileLayer backgroundLayer("",
                                  Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                                  aLayer.getBounds(),
                                  2.0f,
                                  m_BackgroundZPos);

        Drawing drawing(frames, backgroundLayer);

        float tileSize = TileLayer::defaultTileSize;

        TileLayer tempLayer("",
                            Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                            aLayer.getBounds(),
                            tileSize,
                            m_ForegroundZPos,
                            true);

        drawing.addForegroundLayer(tempLayer);

        if (checkerboard)
        {
            m_Checkerboard.create(drawing.getBackgroundLayer());
        }

        return drawing;
    }

    Drawing DocumentFactory::createDrawing(Bounds bounds, bool checkerboard, float zPos) const
    {
        TileLayer initialLayer("layer1", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, 0.5f, zPos);

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
