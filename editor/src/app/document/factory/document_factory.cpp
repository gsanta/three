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

        for (Frame &frame : drawing.getFrameStore().getFrames())
        {
            frame.addLayer(std::move(layer));
        }
    }

    void DocumentFactory::createFrame(Document &document)
    {
        FrameImpl frame(0);

        Frame &activeFrame = document.getFrameStore().getActiveFrame();

        for (TileLayer &layer : activeFrame.getLayers())
        {
            frame.addLayer(layer);
        }

        document.getFrameStore().addFrame(std::move(frame));
    }

    Drawing DocumentFactory::createDrawing(Bounds bounds, bool checkerboard, float zPos)
    {
        Drawing drawing(bounds);

        float tileSize = TileLayer::defaultTileSize;

        TileLayer tempLayer("", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, tileSize, zPos);
        TileLayer backgroundLayer("", Group<Rect2D>(m_RendererProvider->createRenderer2D()), bounds, 2.0f, zPos);

        FrameImpl frame(0);

        drawing.getFrameStore().addFrame(frame);
        drawing.getActiveFrame().addBackgroundLayer(backgroundLayer);
        drawing.getActiveFrame().addForegroundLayer(tempLayer);

        createUserLayer(drawing, "layer1");
        createUserLayer(drawing, "layer2");

        if (checkerboard)
        {
            m_Checkerboard.create(drawing.getBackgroundLayer());
        }

        return drawing;
    }

    Drawing DocumentFactory::resizeDrawing(Drawing &orig, Bounds bounds, bool checkerboard, float zPos)
    {
        Drawing newDrawing(bounds);
        for (Frame &frame : orig.getFrameStore().getFrames())
        {
            Frame &newFrame = newDrawing.getFrameStore().addFrame(FrameImpl(frame.getIndex()));
            for (TileLayer &layer : frame.getLayers())
            {
                TileLayer &newLayer = newFrame.addLayer(TileLayer(layer.getName(),
                                                                  Group<Rect2D>(m_RendererProvider->createRenderer2D()),
                                                                  bounds,
                                                                  layer.getTileSize(),
                                                                  zPos));
                for (Rect2D *rect : layer.getRenderables())
                {
                    Vec2 rectCenter = rect->getCenterPosition2d();
                    if (newLayer.getBounds().contains(rectCenter.x, rectCenter.y))
                    {
                        newLayer.add(*rect);
                    }
                }
            }
        }

        orig = newDrawing;

        return newDrawing;
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
