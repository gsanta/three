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
                         m_TempLayerZPos,
                         true);
    }

    TileLayer DocumentFactory::createCursorLayer(const Bounds &bounds, float tileSize) const
    {
        return TileLayer("",
                         *m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_CursorLayerZPos,
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


    Drawing DocumentFactory::createDrawing(const CreateDrawingProps &props) const
    {
        const Bounds &bounds = props.bounds;
        float backgroundLayerTileSize = props.backgroundLayerTileSize;
        float tileSize = props.tileSize;
        bool hasInitialLayer = props.hasInitialLayer;
        bool hasCheckerBoard = props.hasCheckerBoard;

        Drawing drawing(bounds,
                        createBackgroundLayer(bounds, backgroundLayerTileSize),
                        createTempLayer(bounds, tileSize),
                        createCursorLayer(bounds, tileSize));

        if (hasInitialLayer)
        {
            TileLayer initialLayer("layer1",
                                   *m_RendererProvider->createRenderer2D(),
                                   Group<Rect2D>(),
                                   bounds,
                                   0.5f,
                                   m_TileLayerZPos);

            std::vector<Frame> frames;

            Frame frame(0);

            frame.addLayer(initialLayer);
            frames.push_back(frame);

            drawing.addFrame(frame);
        }

        if (hasCheckerBoard)
        {
            m_Checkerboard.create(drawing.getBackgroundLayer());
        }

        return drawing;
    }

    Document DocumentFactory::createEmptyDocument() const
    {
        float pixelCount = 32.0f;
        Bounds drawingBounds =
            Bounds::createWithPositions(-pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f, pixelCount / 2.0f);

        Camera camera(m_Window, -1.0f, 1.0f);

        CreateDrawingProps createDrawingProps(drawingBounds);
        createDrawingProps.hasCheckerBoard = false;
        createDrawingProps.hasInitialLayer = false;

        Document document(drawingBounds,
                          camera,
                          createDrawing(createDrawingProps),
                          std::make_shared<DocumentHistory>());

        return document;
    }

    Document DocumentFactory::createDocument()
    {
        float pixelCount = 32.0f;

        Document document = createEmptyDocument();

        document.addDrawing(createDrawing(
            CreateDrawingProps(Bounds::createWithPositions(-16.0f, -pixelCount / 2.0f, 16.0f, pixelCount / 2.0f))));

        return document;
    }
} // namespace editor
} // namespace spright
