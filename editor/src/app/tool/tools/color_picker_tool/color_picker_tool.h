#pragma once
#include "../../../document/document_store.h"
#include "../../../document/drawing.h"
#include "../../../event/event_emitter.h"
#include "../../context/tool_context.h"
#include "../../tool.h"
#include "../../tools/brush_tool/brush_tool.h"

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

        void setColor(unsigned int color);

    private:
        void emitColorChange() const;

    private:
        DocumentStore *m_DocumentStore;

        EventEmitter *m_EventEmitter;

        unsigned int m_Color = COLOR_BLACK;
    };
} // namespace editor
} // namespace spright
