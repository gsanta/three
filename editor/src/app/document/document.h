#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "../../engine/layout/container.h"
#include "../event/event_emitter.h"
#include "../feature/frame/frame_player.h"
#include "drawing.h"
#include "frame.h"

#include <algorithm>
#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class Document : public Container
    {
    public:
        Document(Bounds bounds, Camera m_Camera, Drawing canvas);

        Frame &getActiveFrame();

        TileLayer &getActiveLayer();

        Drawing &getActiveDrawing();

        Drawing &getDrawing(size_t index);

        Drawing *getDrawingAt(const Vec2 &pos);

        void addDrawing(const Drawing &drawing);

        std::vector<Drawing> &getDrawings();

        Drawing &getCanvas();

        Camera &getCamera();

        std::string getJson();

        void render();

    private:
        std::vector<Drawing> m_Drawings;

        Drawing m_Canvas;

        size_t m_ActiveDrawing;

        Camera m_Camera;
    };
} // namespace editor
} // namespace spright
