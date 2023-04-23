#pragma once
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/renderable2d.h"
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "../editor_config.h"
#include "brush.h"
#include "colorable.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;
    using namespace spright::maths;

    class BrushTool : public Tool, public Colorable
    {
    private:
        DocumentStore *m_documentStore;

        int m_Size = 1;

        Rect2D *sprite;

        Brush brush;

    public:
        BrushTool(DocumentStore *documentStore);

        void setSize(int size);

        void pointerMove(const ToolContext &) override;

        void pointerDown(const ToolContext &) override;

    private:
        void paint(const PointerInfo &pointerInfo);
    };
} // namespace editor
} // namespace spright
