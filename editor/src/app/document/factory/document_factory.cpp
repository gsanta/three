#include "document_factory.h"

namespace spright
{
namespace editor
{

    DocumentFactory::DocumentFactory(Container *windowContainer, RendererProvider *rendererProvider)
        : m_WindowContainer(windowContainer), m_RendererProvider(rendererProvider)
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

    void DocumentFactory::createUserLayer(Drawing &drawing, std::string name)
    {
        TileLayer layer(name, Group<Rect2D>(m_RendererProvider->createRenderer2D()), drawing.getBounds());

        for (Frame &frame : drawing.getFrames())
        {
            frame.addLayer(std::move(layer));
        }
    }

    TileLayer DocumentFactory::createTileLayer(std::string name, const Bounds &bounds, float tileSize)
    {
        TileLayer tileLayer("",
                            Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                            bounds,
                            tileSize,
                            m_BackgroundZPos);

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

    Drawing DocumentFactory::createDrawing(Bounds bounds, bool checkerboard, float zPos)
    {
        TileLayer initialLayer("layer1", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds);
        TileLayer backgroundLayer("", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, 2.0f, zPos);

        Drawing drawing(initialLayer, backgroundLayer);

        float tileSize = TileLayer::defaultTileSize;

        TileLayer tempLayer("", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, tileSize, zPos);

        drawing.addForegroundLayer(tempLayer);

        if (checkerboard)
        {
            m_Checkerboard.create(drawing.getBackgroundLayer());
        }

        return drawing;
    }

    Document DocumentFactory::createDocument()
    {
        float pixelCount = 32.0f;
        Bounds drawingBounds =
            Bounds::createWithPositions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);

        Camera camera(m_WindowContainer->getBounds().getWidth(),
                      m_WindowContainer->getBounds().getHeight(),
                      drawingBounds,
                      -1.0f,
                      1.0f);

        Document document(drawingBounds, camera, createDrawing(drawingBounds, false, 0.01f));

        document.addDrawing(
            createDrawing(Bounds::createWithPositions(-16.0f, 16.0f, -pixelCount / 2.0f, pixelCount / 2.0f)));

        return document;
    }
} // namespace editor
} // namespace spright
