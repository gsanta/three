#pragma once
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/system/window/input_listener.h"
#include "../../engine/system/window/window.h"
#include "../algorithm/flip_horizontal.h"
#include "../algorithm/shear_horizontal.h"
#include "../algorithm/shear_vertical.h"
#include "../document/factory/document_factory.h"
#include "../document/resize_drawing.h"
#include "../editor_config.h"
#include "../service/io/image_export.h"
#include "../service/services.h"
#include "context/document_info.h"
#include "context/pointer_info.h"
#include "context/tool_context.h"
#include "tool.h"
#include "tool_store.h"
#include "tools/color_picker_tool/color_picker_tool.h"
#include "tools/eraser_tool/eraser_tool.h"
#include "tools/rectangle_tool/rectangle_tool.h"
#include "tools/select_tool/select_tool.h"

#include <algorithm>
#include <iostream>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace std;
    using namespace ::spright::engine;

    class ToolHandler : public InputListener
    {
    public:
        ToolHandler(Window *window, DocumentStore *documentStore);

        ~ToolHandler();

        ToolHandler &operator=(const ToolHandler &toolHandler);

        // TODO: destructor
        virtual void onMouseUp(bool buttons[3]) override;

        virtual void onMouseDown(bool buttons[3]) override;

        virtual void onMouseMove(double x, double y) override;

        virtual void onScroll(double x, double y) override;

        void executeTool(const string &toolName);

        ToolStore &getToolStore();

        inline vector<Tool *> *getActiveTool() const
        {
            return m_ActiveTools;
        }

        Tool *getSelectedTool();

        void setSelectedTool(string name);

        void addActiveTool(string name);

        inline void removeActiveTool(string name);

        bool isActiveTool(string name);

    private:
        Window *m_Window;

        vector<Tool *> *m_ActiveTools;

        Tool *m_SelectedTool = nullptr;

        std::shared_ptr<ToolStore> m_ToolStore;

        DocumentStore *m_DocumentStore;

        ToolContext m_ToolContext;
    };
} // namespace editor
} // namespace spright
