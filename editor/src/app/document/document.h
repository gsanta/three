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
    class DocumentHistory;

    using namespace ::spright::engine;

    class Document : public Container
    {
    public:
        Document(Bounds bounds, Camera m_Camera, Drawing canvas, std::shared_ptr<DocumentHistory> history);

        Frame &getActiveFrame();

        TileLayer &getActiveLayer();

        Drawing &getActiveDrawing();

        Drawing &getDrawing(size_t index);

        size_t getActiveDrawingIndex() const;

        Drawing *getDrawingAt(const Vec2 &pos);

        void addDrawing(const Drawing &drawing);

        void removeActiveDrawing();

        std::vector<Drawing> &getDrawings();

        std::shared_ptr<DocumentHistory> getHistory();

        void empty();

        Drawing &getCanvas();

        Camera &getCamera();

        void setCamera(const Camera &camera);

        std::string getJson();

    private:
        std::vector<Drawing> m_Drawings;

        Drawing m_Canvas;

        size_t m_ActiveDrawing;

        Camera m_Camera;

        std::shared_ptr<DocumentHistory> m_History;
    };
} // namespace editor
} // namespace spright
