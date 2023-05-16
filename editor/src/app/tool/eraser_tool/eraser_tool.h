#pragma once

#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../engine/graphics/renderable/renderable2d.h"
#include "../../document/document_store.h"
#include "../../document/drawing.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"
#include "eraser.h"
#include "eraser_cursor.h"
#include "eraser_stroke.h"

#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace spright::maths;
    using namespace spright::engine;

    class EraserTool : public Tool
    {
    public:
        EraserTool(int eraserSize);

        void pointerDown(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

        void setOptions(std::string json) override;

        std::string getOptions() override;

    private:
        DocumentStore *m_documentStore;

        Eraser m_Eraser;

        int m_Size = 3;

        float m_DashSize = 0.2f;

        bool m_IsMoveSelection = false;

        float m_NoMovementTolerance = 0.1f;
    };
} // namespace editor
} // namespace spright
