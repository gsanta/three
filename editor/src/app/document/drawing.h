#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "drawing_state.h"
#include "frame.h"

#include <memory>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class Drawing : public Container
    {
    public:
        Drawing(const TileLayer &initialLayer, const TileLayer &backgroundLayer);

        Drawing(const std::vector<Frame> &frames, const TileLayer &backgroundLayer);

        std::vector<Frame> &getFrames();

        const std::vector<Frame> &getFrames() const;

        Frame &getActiveFrame();

        void setActiveFrame(size_t index);

        Frame &addFrame(const Frame &frame);

        void removeFrame(size_t index);

        Frame &getFrame(size_t frameIndex);

        TileLayer &getActiveLayer();

        void setActiveLayer(size_t index);

        TileLayer &addLayer(const TileLayer &tileLayer);

        TileLayer &getForegroundLayer();

        TileLayer &getBackgroundLayer();

        TileLayer &getBackgroundLayer() const;

        void addBackgroundLayer(const TileLayer &tileLayer);

        void addForegroundLayer(const TileLayer &tileLayer);

        std::string getJson();

        void render(const Camera &camera);

        DrawingState &getState();

    private:
        std::shared_ptr<TileLayer> m_BackgroundLayer;

        std::vector<TileLayer> m_ForegroundLayers;

        std::vector<Frame> m_Frames;

        size_t m_ActiveFrameIndex = 0;

        size_t m_ActiveLayerIndex = 0;

        DrawingState m_DrawingState;
    };
} // namespace editor
} // namespace spright
