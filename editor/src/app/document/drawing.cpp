#include "drawing.h"

namespace spright
{
namespace editor
{

    Drawing resize_drawing(Drawing &orig, Bounds bounds);

    Drawing::Drawing(const std::string &uuid,
                     const Bounds &bounds,
                     const TileLayer &backgroundLayer,
                     const TileLayer &tempLayer,
                     const TileLayer &toolLayer,
                     const TileLayer &cursorLayer,
                     const Layer &decorationLayer)
        : Canvas(uuid, bounds, decorationLayer)
    {
        m_BackgroundLayer = std::make_shared<TileLayer>(backgroundLayer);
        m_TempLayer = std::make_shared<TileLayer>(tempLayer);
        m_ToolLayer = std::make_shared<TileLayer>(toolLayer);
        m_CursorLayer = std::make_shared<TileLayer>(cursorLayer);
    }

    Drawing::Drawing(const std::string &uuid,
                     const TileLayer &initialLayer,
                     const TileLayer &backgroundLayer,
                     const TileLayer &tempLayer,
                     const TileLayer &toolLayer,
                     const TileLayer &cursorLayer,
                     const Layer &decorationLayer)
        : Canvas(uuid, initialLayer.getBounds(), decorationLayer)
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

    std::vector<Frame> &Drawing::getFrames()
    {
        return m_Frames;
    }

    const std::vector<Frame> &Drawing::getFrames() const
    {
        return m_Frames;
    }

    Frame &Drawing::getActiveFrame()
    {
        return m_Frames[m_ActiveFrameIndex];
    }

    size_t Drawing::getActiveFrameIndex() const
    {
        return m_ActiveFrameIndex;
    }

    void Drawing::setActiveFrame(size_t index)
    {
        if (index >= m_Frames.size())
        {
            throw std::invalid_argument("No frame at index " + std::to_string(index));
        }

        m_ActiveFrameIndex = index;
    }

    Frame &Drawing::addFrame(const std::vector<TileLayer> &layers)
    {
        if (m_Frames.size() > 0 && m_Frames[0].getLayers().size() != layers.size())
        {
            throw std::invalid_argument(
                "Drawing contains frames with different layer count, layer count for all frames must be equal");
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

    void Drawing::removeFrame(size_t index)
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

    Frame &Drawing::getFrame(size_t frameIndex)
    {
        auto it =
            find_if(m_Frames.begin(), m_Frames.end(), [=](Frame &frame) { return frame.getIndex() == frameIndex; });

        if (it != m_Frames.end())
        {
            return *it;
        }

        throw std::invalid_argument("Frame with index " + std::to_string(frameIndex) + " not found");
    }

    void Drawing::addLayer(const TileLayer &tileLayer)
    {
        if (getBounds() != tileLayer.getBounds())
        {
            throw std::invalid_argument("Can not add a TileLayer to a Drawing with different bounds");
        }

        for (Frame &frame : m_Frames)
        {
            frame.addLayer(tileLayer);
        }

        m_TempLayers.push_back(tileLayer);
        m_TempLayers.back().clear();
    }

    void Drawing::removeLayer(size_t index)
    {
        for (Frame &frame : m_Frames)
        {
            frame.removeLayer(index);
        }

        m_TempLayers.erase(m_TempLayers.begin() + index);
    }


    TileLayer &Drawing::getActiveLayer()
    {
        return getActiveFrame().getLayers()[m_ActiveLayerIndex];
    }

    size_t Drawing::getActiveLayerIndex() const
    {
        return m_ActiveLayerIndex;
    }

    void Drawing::setActiveLayer(size_t index)
    {
        m_ActiveLayerIndex = index;
    }

    TileLayer &Drawing::getBackgroundLayer()
    {
        return *m_BackgroundLayer;
    }

    const TileLayer &Drawing::getBackgroundLayer() const
    {
        return *m_BackgroundLayer;
    }


    TileLayer &Drawing::getTempLayer(size_t index)
    {
        return m_TempLayers[index];
    }

    const TileLayer &Drawing::getTempLayer(size_t index) const
    {
        return m_TempLayers[index];
    }

    TileLayer &Drawing::getTempLayerOfActiveLayer()
    {
        return m_TempLayers[getActiveLayerIndex()];
    }

    size_t Drawing::getTempLayerCount() const
    {
        return m_TempLayers.size();
    }

    TileLayer &Drawing::getToolLayer()
    {
        return *m_ToolLayer;
    }

    const TileLayer &Drawing::getToolLayer() const
    {
        return *m_ToolLayer;
    }

    TileLayer &Drawing::getCursorLayer()
    {
        return *m_CursorLayer;
    }

    void Drawing::addBackgroundLayer(const TileLayer &tileLayer)
    {
        m_BackgroundLayer = std::make_shared<TileLayer>(tileLayer);
    }

    Drawing *Drawing::clone() const
    {
        return new Drawing(*this);
    }

    void Drawing::render(const Camera &camera, Canvas::RenderTarget target)
    {
        for (TileLayer &layer : getActiveFrame().getLayers())
        {
            layer.render(camera);
        }

        if (target == Screen)
        {
            for (size_t i = 0; i < getTempLayerCount(); i++)
            {
                getTempLayer(i).render(camera);
            }

            getBackgroundLayer().render(camera);

            getDecorationLayer().render(camera);

            getToolLayer().render(camera);

            getCursorLayer().render(camera);
        }
    }

    std::string Drawing::getJson()
    {
        nlohmann::json json = getActiveFrame().getLayer(m_ActiveLayerIndex).getJson();

        return json.dump();
    }

    DrawingState &Drawing::getState()
    {
        return m_DrawingState;
    }


} // namespace editor
} // namespace spright
