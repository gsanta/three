#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "../feature/frame/frame_player.h"
#include "drawing_state.h"
#include "frame_store.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class Drawing : public Container
    {
    public:
        Drawing(Bounds bounds);

        Drawing(const Drawing &);

        ~Drawing();

        Drawing &operator=(const Drawing &);

        FrameStore &getFrameStore();

        ActiveFrame &getActiveFrame();

        Frame &getFrame(size_t frameIndex);

        TileLayer &getActiveLayer();

        TileLayer &addLayer(const TileLayer &tileLayer);

        TileLayer &getForegroundLayer();

        TileLayer &getBackgroundLayer();

        std::string getJson();

        void render(const Camera &camera);

        FramePlayer &getFramePlayer();

        DrawingState &getState();

        void resize(Bounds newBounds);

    private:
        FrameStore m_FrameStore;

        FramePlayer *m_FramePlayer;

        DrawingState m_DrawingState;
    };
} // namespace editor
} // namespace spright
