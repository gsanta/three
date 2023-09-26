#pragma once
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "../event/event_emitter.h"
#include "../service/services.h"
#include "brush_tool.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

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

    public:
        ColorPickerTool(EventEmitter *eventEmitter);

        void pointerDown(const ToolContext &) override;

        unsigned int getPickedColor() const;

        std::string getData() override;

        unsigned int getColor() const;

    private:
        void emitColorChange() const;

    private:
        DocumentStore *m_DocumentStore;

        EventEmitter *m_EventEmitter;

        unsigned int m_Color = 0xFF000000;
    };
} // namespace editor
} // namespace spright
