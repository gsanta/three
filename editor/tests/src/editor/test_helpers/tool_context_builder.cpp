#include "tool_context_builder.h"

ToolContextBuilder &ToolContextBuilder::withPointerInfo(PointerInfoBuilder builder)
{
    m_PointerInfo = builder;
    return *this;
}


ToolContext ToolContextBuilder::build(Document &document)
{
    ToolContext toolContext;

    PointerInfo pointer = m_PointerInfo.build();

    DocumentInfo doc;

    std::shared_ptr<ToolStore> toolStore = std::make_shared<ToolStore>();

    toolStore->addTool(new SelectTool());
    toolStore->addTool(new RectangleTool());

    toolContext.tools = toolStore;

    doc.document = &document;
    doc.activeDrawing = &document.getActiveDrawing();

    toolContext.pointer = pointer;
    toolContext.doc = doc;

    return toolContext;
}
