#pragma once
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "../event/event_emitter.h"
#include "../service/services.h"
#include "brush_tool.h"
#include "helper/layer_provider.h"
#include "tool/tool.h"
#include "tool/tool_context.h"
#include "tool_handler.h"

#include <iostream>
#include <sstream>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;
    using namespace ::spright::maths;

    class ColorPickerTool : public Tool
    {
    private:
        DocumentStore *m_DocumentStore;
        ToolHandler *m_ToolHandler;
        EventEmitter *m_EventEmitter;

        unsigned int m_PickedColor;

    public:
        ColorPickerTool(ToolHandler *toolHandler, EventEmitter *eventEmitter);
        void pointerDown(ToolContext &) override;
        unsigned int getPickedColor() const;
        std::string getData() override;

    private:
        void emitColorChange() const;
    };
} // namespace editor
} // namespace spright
