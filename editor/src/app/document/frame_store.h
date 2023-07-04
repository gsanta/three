#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "active_frame.h"
#include "frame_impl.h"

#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    class FrameStore
    {
    public:
        FrameStore();

        void activateNextFrame();

        Frame &addFrame(const Frame &frame);

        void removeFrame(size_t index);

        void setActiveFrame(size_t index);

        ActiveFrame &getActiveFrame();

        bool hasActiveFrame() const;

        std::vector<FrameImpl> &getFrames();

        Frame &getFrame(size_t index);

    private:
        std::vector<FrameImpl> m_Frames;

        ActiveFrame m_ActiveFrame;
    };
} // namespace editor
} // namespace spright
