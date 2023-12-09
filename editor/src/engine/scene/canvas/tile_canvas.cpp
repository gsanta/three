#include "tile_canvas.h"

namespace spright
{
namespace editing
{

    TileCanvas resize_drawing(TileCanvas &orig, Bounds bounds);

    TileCanvas::TileCanvas(const std::string &uuid,
                           const Bounds &bounds,
                           const Renderer2D &renderer,
                           const TileLayer &backgroundLayer,
                           const TileLayer &tempLayer,
                           const TileLayer &toolLayer,
                           const TileLayer &cursorLayer)
        : Canvas(uuid, bounds, renderer)
    {
        m_BackgroundLayer = std::make_shared<TileLayer>(backgroundLayer);
        m_TempLayer = std::make_shared<TileLayer>(tempLayer);
        m_ToolLayer = std::make_shared<TileLayer>(toolLayer);
        m_CursorLayer = std::make_shared<TileLayer>(cursorLayer);
    }

    TileCanvas::TileCanvas(const std::string &uuid,
                           const Renderer2D &renderer,
                           const TileLayer &initialLayer,
                           const TileLayer &backgroundLayer,
                           const TileLayer &tempLayer,
                           const TileLayer &toolLayer,
                           const TileLayer &cursorLayer)
        : Canvas(uuid, initialLayer.getBounds(), renderer)
    {
        Frame frame(0);
        frame.addLayer(initialLayer);
        m_Frames.push_back(frame);

        m_TempLayers.push_back(initialLayer);
        m_TempLayers[0].clear();

        m_BackgroundLayer = std::make_shared<TileLayer>(backgroundLayer);
        m_TempLayer = std::make_shared<TileLayer>(tempLayer);
        m_ToolLayer = std::make_shared<TileLayer>(toolLayer);
        m_CursorLayer = std::make_shared<TileLayer>(cursorLayer);
    }

    TileCanvas::TileCanvas(const TileCanvas &other)
        : Canvas(other), m_BackgroundLayer(std::shared_ptr<TileLayer>(new TileLayer(*other.m_BackgroundLayer))),
          m_TempLayer(std::shared_ptr<TileLayer>(new TileLayer(*other.m_TempLayer))),
          m_ToolLayer(std::shared_ptr<TileLayer>(new TileLayer(*other.m_ToolLayer))),
          m_CursorLayer(std::shared_ptr<TileLayer>(new TileLayer(*other.m_CursorLayer))),
          m_TempLayers(other.m_TempLayers), m_Frames(other.m_Frames), m_ActiveFrameIndex(other.m_ActiveFrameIndex),
          m_ActiveLayerIndex(other.m_ActiveLayerIndex)
    {
    }

    TileCanvas &TileCanvas::operator=(const TileCanvas &other)
    {
        Canvas::operator=(other);
        m_BackgroundLayer.reset(new TileLayer(*other.m_BackgroundLayer));

        m_TempLayer.reset(new TileLayer(*other.m_TempLayer));
        m_ToolLayer.reset(new TileLayer(*other.m_ToolLayer));
        m_CursorLayer.reset(new TileLayer(*other.m_CursorLayer));
        m_TempLayers = other.m_TempLayers;
        m_Frames = other.m_Frames;
        m_ActiveFrameIndex = other.m_ActiveFrameIndex;
        m_ActiveLayerIndex = other.m_ActiveLayerIndex;

        return *this;
    }

    std::vector<Frame> &TileCanvas::getFrames()
    {
        return m_Frames;
    }

    const std::vector<Frame> &TileCanvas::getFrames() const
    {
        return m_Frames;
    }

    Frame &TileCanvas::getActiveFrame()
    {
        return m_Frames[m_ActiveFrameIndex];
    }

    size_t TileCanvas::getActiveFrameIndex() const
    {
        return m_ActiveFrameIndex;
    }

    void TileCanvas::setActiveFrame(size_t index)
    {
        if (index >= m_Frames.size())
        {
            throw std::invalid_argument("No frame at index " + std::to_string(index));
        }

        m_ActiveFrameIndex = index;
    }

    Frame &TileCanvas::addFrame(const std::vector<TileLayer> &layers)
    {
        if (m_Frames.size() > 0 && m_Frames[0].getLayers().size() != layers.size())
        {
            throw std::invalid_argument(
                "TileCanvas contains frames with different layer count, layer count for all frames must be equal");
        }

        int index = m_Frames.size();
        m_Frames.push_back(Frame());
        m_Frames.back().setIndex(index);

        for (const TileLayer &layer : layers)
        {
            m_Frames.back().addLayer(layer);

            if (m_Frames.size() == 1)
            {
                m_TempLayers.push_back(layer);
                m_TempLayers.back().clear();
            }
        }

        return m_Frames.back();
    }

    void TileCanvas::removeFrame(size_t index)
    {
        if (m_Frames.size() <= 1)
        {
            throw std::invalid_argument("The last frame can not be removed");
        }

        m_Frames.erase(m_Frames.begin() + index);

        for (int i = 0; i < m_Frames.size(); i++)
        {
            m_Frames[i].setIndex(i);
        }

        m_ActiveFrameIndex = index < m_Frames.size() ? index : 0;
    }

    Frame &TileCanvas::getFrame(size_t frameIndex)
    {
        auto it =
            find_if(m_Frames.begin(), m_Frames.end(), [=](Frame &frame) { return frame.getIndex() == frameIndex; });

        if (it != m_Frames.end())
        {
            return *it;
        }

        throw std::invalid_argument("Frame with index " + std::to_string(frameIndex) + " not found");
    }

    void TileCanvas::addLayer(const TileLayer &tileLayer)
    {
        if (getBounds() != tileLayer.getBounds())
        {
            throw std::invalid_argument("Can not add a TileLayer to a TileCanvas with different bounds");
        }

        for (Frame &frame : m_Frames)
        {
            frame.addLayer(tileLayer);
        }

        m_TempLayers.push_back(tileLayer);
        m_TempLayers.back().clear();
    }

    void TileCanvas::removeLayer(size_t index)
    {
        for (Frame &frame : m_Frames)
        {
            frame.removeLayer(index);
        }

        m_TempLayers.erase(m_TempLayers.begin() + index);
    }


    TileLayer &TileCanvas::getActiveLayer()
    {
        return getActiveFrame().getLayers()[m_ActiveLayerIndex];
    }

    size_t TileCanvas::getActiveLayerIndex() const
    {
        return m_ActiveLayerIndex;
    }

    void TileCanvas::setActiveLayer(size_t index)
    {
        m_ActiveLayerIndex = index;
    }

    TileLayer &TileCanvas::getBackgroundLayer()
    {
        return *m_BackgroundLayer;
    }

    const TileLayer &TileCanvas::getBackgroundLayer() const
    {
        return *m_BackgroundLayer;
    }


    TileLayer &TileCanvas::getTempLayer(size_t index)
    {
        return m_TempLayers[index];
    }

    const TileLayer &TileCanvas::getTempLayer(size_t index) const
    {
        return m_TempLayers[index];
    }

    TileLayer &TileCanvas::getTempLayerOfActiveLayer()
    {
        return m_TempLayers[getActiveLayerIndex()];
    }

    size_t TileCanvas::getTempLayerCount() const
    {
        return m_TempLayers.size();
    }

    TileLayer &TileCanvas::getToolLayer()
    {
        return *m_ToolLayer;
    }

    const TileLayer &TileCanvas::getToolLayer() const
    {
        return *m_ToolLayer;
    }

    TileLayer &TileCanvas::getCursorLayer()
    {
        return *m_CursorLayer;
    }

    void TileCanvas::addBackgroundLayer(const TileLayer &tileLayer)
    {
        m_BackgroundLayer = std::make_shared<TileLayer>(tileLayer);
    }

    TileCanvas *TileCanvas::clone() const
    {
        return new TileCanvas(*this);
    }

    void TileCanvas::render(const Camera &camera, Canvas::RenderTarget target)
    {
        const Camera *actualCamera = getCamera() != nullptr ? getCamera() : &camera;
        const Mat4 &proj = actualCamera->getProjectionMatrix();
        const Mat4 &view = actualCamera->getViewMatrix();

        for (TileLayer &layer : getActiveFrame().getLayers())
        {
            layer.render(proj, view, getRenderer());
        }

        if (target == Screen)
        {
            for (size_t i = 0; i < getTempLayerCount(); i++)
            {
                getTempLayer(i).render(proj, view, getRenderer());
            }

            getBackgroundLayer().render(proj, view, getRenderer());

            getDecorationLayer().render(proj, view, getRenderer());

            getToolLayer().render(proj, view, getRenderer());

            getCursorLayer().render(proj, view, getRenderer());
        }
    }

    std::string TileCanvas::getJson()
    {
        nlohmann::json json = getActiveFrame().getLayer(m_ActiveLayerIndex).getJson();

        return json.dump();
    }

    void TileCanvas::setCamera(const Camera &camera)
    {
        m_Camera.reset(camera.clone());
    }

    Camera *TileCanvas::getCamera()
    {
        return m_Camera.get();
    }

    const std::string &TileCanvas::getType() const
    {
        return CANVAS_TYPE_TILE;
    }

} // namespace editing
} // namespace spright
