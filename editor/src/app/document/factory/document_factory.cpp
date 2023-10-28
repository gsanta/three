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
        return TileLayer(name, m_RendererProvider->createRenderer2D(), Group<Rect2D>(), bounds, tileSize);
    }

    TileLayer DocumentFactory::createTileLayer(std::string name, const Bounds &bounds, float tileSize) const
    {
        TileLayer tileLayer("",
                            m_RendererProvider->createRenderer2D(),
                            Group<Rect2D>(),
                            bounds,
                            tileSize,
                            m_TileLayerZPos);

        return tileLayer;
    }


    TileLayer DocumentFactory::createBackgroundLayer(const Bounds &bounds, float tileSize) const
    {
        TileLayer backgroundLayer("",
                                  m_RendererProvider->createRenderer2D(),
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
                         m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_TileLayerZPos,
                         true);
    }

    TileLayer DocumentFactory::createToolLayer(const Bounds &bounds, float tileSize) const
    {
        return TileLayer("",
                         m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_ToolLayerZPos,
                         true);
    }

    TileLayer DocumentFactory::createCursorLayer(const Bounds &bounds, float tileSize) const
    {
        return TileLayer("",
                         m_RendererProvider->createRenderer2D(),
                         Group<Rect2D>(),
                         bounds,
                         tileSize,
                         m_CursorLayerZPos,
                         true);
    }

    void DocumentFactory::createFrame(Document &document)
    {
        Frame frame(0);

        Frame &activeFrame = document.getActiveDrawing()->getFrame(0);

        std::vector<TileLayer> layers;

        for (TileLayer &layer : activeFrame.getLayers())
        {
            layers.push_back(layer);
        }

        document.getActiveDrawing()->addFrame(layers);
    }


    Drawing DocumentFactory::createDrawing(const CreateDrawingProps &props) const
    {
        const Bounds &bounds = props.bounds;
        float backgroundLayerTileSize = props.backgroundLayerTileSize;
        float tileSize = props.tileSize;
        size_t layerCount = props.layerCount;
        bool hasCheckerBoard = props.hasCheckerBoard;

        Drawing drawing(bounds,
                        createBackgroundLayer(bounds, backgroundLayerTileSize),
                        createTempLayer(bounds, tileSize),
                        createToolLayer(bounds, tileSize),
                        createCursorLayer(bounds, tileSize),
                        Layer(m_RendererProvider->createRenderer2D()));

        if (layerCount > 0)
        {
            std::vector<TileLayer> layers;

            for (size_t i = 0; i < layerCount; i++)
            {
                TileLayer layer("layer" + std::to_string(i + 1),
                                m_RendererProvider->createRenderer2D(),
                                Group<Rect2D>(),
                                bounds,
                                tileSize,
                                m_TileLayerZPos);

                layers.push_back(layer);
            }

            drawing.addFrame(layers);
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
        Bounds drawingBounds(-pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f, pixelCount / 2.0f);

        Camera camera(m_Window, -1.0f, 1.0f);

        Document document(drawingBounds,
                          Canvas(drawingBounds, Layer(m_RendererProvider->createRenderer2D())),
                          camera,
                          std::make_shared<DocumentHistory>());

        return document;
    }

    Document DocumentFactory::createDocument()
    {
        float pixelCount = 32.0f;

        Document document = createEmptyDocument();

        Drawing drawing = createDrawing(
            CreateDrawingProps(Bounds::createWithPositions(-16.0f, -pixelCount / 2.0f, 16.0f, pixelCount / 2.0f)));

        document.addDrawing(drawing);

        return document;
    }
} // namespace editor
} // namespace spright
