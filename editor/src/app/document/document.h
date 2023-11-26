#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/tile_layer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "../../engine/structure/canvas.h"
#include "../../engine/structure/drawing3d.h"
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

    class Document
    {
    public:
        Document(const Bounds &bounds, const Canvas &canvas, std::shared_ptr<DocumentHistory> history);

        Document(const Document &other);

        //! Represents the Drawing() over which the pointer resides or over which a drag action started
        //! @return The active Drawing() or nullptr
        Drawing *getActiveDrawing();

        Canvas *getActiveCanvas();

        int getActiveCanvasIndex() const;

        Drawing &addDrawing(const Drawing &drawing);

        Drawing &getDrawing(std::string uuid);

        void removeCanvas(const std::string &uuid);

        Drawing3d &addDrawing3d(const Drawing3d &drawing);

        std::vector<Drawing3d> &getDrawing3ds();

        void setActiveCanvas(const std::string &uuid);

        std::vector<std::unique_ptr<Canvas>> &getCanvases();

        Canvas &getCanvas(std::string uuid);

        std::shared_ptr<DocumentHistory> getHistory();

        void empty();

        Canvas &getCanvas();

        void setCamera(const Camera &camera);

        Canvas &getBackgroundCanvas();

    private:
        std::vector<std::unique_ptr<Canvas>> m_AllCanvases;

        int m_ActiveCanvasIndex = -1;

        Canvas m_Canvas;

        std::shared_ptr<DocumentHistory> m_History;
    };
} // namespace editor
} // namespace spright
