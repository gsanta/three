#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "drawing_state.h"
#include "frame.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class Drawing : public Container
    {
    public:
        Drawing(Bounds bounds);

        std::vector<Frame> &getFrames();

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

        void addBackgroundLayer(const TileLayer &tileLayer);

        void addForegroundLayer(const TileLayer &tileLayer);

        std::string getJson();

        void render(const Camera &camera);

        DrawingState &getState();

        void resize(Bounds newBounds);

    private:
        std::vector<TileLayer> m_BackgroundLayers;

        std::vector<TileLayer> m_ForegroundLayers;

        std::vector<Frame> m_Frames;

        size_t m_ActiveFrameIndex = 0;

        size_t m_ActiveLayerIndex = 0;

        DrawingState m_DrawingState;
    };
} // namespace editor
} // namespace spright
