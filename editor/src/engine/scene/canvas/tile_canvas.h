#pragma once

#include "../../scene/cameras/camera.h"
#include "../containers/frame.h"
#include "../containers/layer.h"
#include "canvas.h"

#include <memory>

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class TileCanvas : public Canvas
    {
    public:
        TileCanvas(const std::string &uuid,
                   const Bounds &bounds,
                   const Renderer2D &renderer,
                   const TileLayer &backgroundLayer,
                   const TileLayer &tempLayer,
                   const TileLayer &toolLayer,
                   const TileLayer &cursorLayer);

        TileCanvas(const std::string &uuid,
                   const Renderer2D &renderer,
                   const TileLayer &initialLayer,
                   const TileLayer &backgroundLayer,
                   const TileLayer &tempLayer,
                   const TileLayer &toolLayer,
                   const TileLayer &cursorLayer);

        TileCanvas(const TileCanvas &other);

        TileCanvas &operator=(const TileCanvas &other);

        std::vector<Frame> &getFrames();

        const std::vector<Frame> &getFrames() const;

        Frame &getActiveFrame();

        size_t getActiveFrameIndex() const;

        void setActiveFrame(size_t index);

        Frame &addFrame(const std::vector<TileLayer> &layers);

        void removeFrame(size_t index);

        Frame &getFrame(size_t frameIndex);

        TileLayer &getActiveLayer();

        size_t getActiveLayerIndex() const;

        void setActiveLayer(size_t index);

        void addLayer(const TileLayer &tileLayer);

        void removeLayer(size_t index);

        TileLayer &getBackgroundLayer();

        const TileLayer &getBackgroundLayer() const;

        TileLayer &getTempLayer(size_t index);

        const TileLayer &getTempLayer(size_t index) const;

        TileLayer &getTempLayerOfActiveLayer();

        size_t getTempLayerCount() const;

        TileLayer &getToolLayer();

        const TileLayer &getToolLayer() const;

        TileLayer &getCursorLayer();

        void addBackgroundLayer(const TileLayer &tileLayer);

        TileCanvas *clone() const override;

        void render(const Camera &camera, Canvas::RenderTarget target) override;

        std::string getJson();

        void setCamera(const Camera &camera);

        Camera *getCamera() override;

    private:
        std::unique_ptr<Camera> m_Camera;

        std::shared_ptr<TileLayer> m_BackgroundLayer;

        std::shared_ptr<TileLayer> m_TempLayer;

        std::shared_ptr<TileLayer> m_ToolLayer;

        std::shared_ptr<TileLayer> m_CursorLayer;

        std::vector<TileLayer> m_TempLayers;

        std::vector<Frame> m_Frames;

        size_t m_ActiveFrameIndex = 0;

        size_t m_ActiveLayerIndex = 0;
    };
} // namespace editing
} // namespace spright
