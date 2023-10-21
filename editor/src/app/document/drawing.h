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
        Drawing(const Bounds &bounds,
                const TileLayer &backgroundLayer,
                const TileLayer &tempLayer,
                const TileLayer &toolLayer,
                const TileLayer &cursorLayer);

        Drawing(const TileLayer &initialLayer,
                const TileLayer &backgroundLayer,
                const TileLayer &tempLayer,
                const TileLayer &toolLayer,
                const TileLayer &cursorLayer);

        Drawing(const std::vector<Frame> &frames,
                const TileLayer &backgroundLayer,
                const TileLayer &tempLayer,
                const TileLayer &toolLayer,
                const TileLayer &cursorLayer);

        std::vector<Frame> &getFrames();

        const std::vector<Frame> &getFrames() const;

        Frame &getActiveFrame();

        size_t getActiveFrameIndex() const;

        void setActiveFrame(size_t index);

        Frame &addFrame(const Frame &frame);

        void removeFrame(size_t index);

        Frame &getFrame(size_t frameIndex);

        TileLayer &getActiveLayer();

        size_t getActiveLayerIndex() const;

        void setActiveLayer(size_t index);

        TileLayer &addLayer(const TileLayer &tileLayer);

        TileLayer &getBackgroundLayer();

        const TileLayer &getBackgroundLayer() const;

        TileLayer &getTempLayer();

        const TileLayer &getTempLayer() const;

        TileLayer &getToolLayer();

        const TileLayer &getToolLayer() const;

        TileLayer &getCursorLayer();

        void addBackgroundLayer(const TileLayer &tileLayer);

        std::string getJson();

        DrawingState &getState();

    private:
        std::shared_ptr<TileLayer> m_BackgroundLayer;

        std::shared_ptr<TileLayer> m_TempLayer;

        std::shared_ptr<TileLayer> m_ToolLayer;

        std::shared_ptr<TileLayer> m_CursorLayer;

        std::vector<Frame> m_Frames;

        size_t m_ActiveFrameIndex = 0;

        size_t m_ActiveLayerIndex = 0;

        DrawingState m_DrawingState;
    };
} // namespace editor
} // namespace spright
