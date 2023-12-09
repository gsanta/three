#pragma once

#include "../../engine/scene/cameras/camera.h"
#include "../../engine/scene/cameras/ortho_projection_info.h"
#include "../../engine/scene/canvas/canvas.h"
#include "../../engine/scene/canvas/canvas2d.h"
#include "../../engine/scene/canvas/canvas3d.h"
#include "../../engine/scene/canvas/tile_canvas.h"
#include "../../engine/scene/containers/frame.h"
#include "../../engine/scene/containers/group.h"
#include "../../engine/scene/containers/tile_layer.h"
#include "../../maths/data/bounds.h"
#include "../event/event_emitter.h"

#include <algorithm>
#include <memory>
#include <vector>

namespace spright
{
namespace editing
{
    class DocumentHistory;

    using namespace ::spright::engine;

    class Document
    {
    public:
        Document(const Bounds &bounds, const Canvas2d &canvas, std::shared_ptr<DocumentHistory> history);

        Document(const Document &other);

        Canvas *getActiveCanvas();

        Canvas *getCanvas(int index);

        Canvas &addCanvas(const Canvas &canvas);

        void removeCanvas(const Canvas &canvas);

        void setActiveCanvas(const Canvas &canvas);

        int getCanvasIndex(const Canvas &canvas) const;

        Canvas &getBackgroundCanvas();

        std::shared_ptr<DocumentHistory> getHistory();

        int getCanvasCount() const;

        void empty();

        void setCamera(const Camera &camera);

    private:
        void check_canvas_present(std::vector<std::unique_ptr<Canvas>>::const_iterator &it) const;

    private:
        std::vector<std::unique_ptr<Canvas>> m_AllCanvases;

        Canvas *m_ActiveCanvas = nullptr;

        Canvas2d m_Canvas;

        std::shared_ptr<DocumentHistory> m_History;
    };
} // namespace editing
} // namespace spright
