#pragma once

#include "../../document/document_store.h"
#include "../../document/drawing.h"
#include "../../document/factory/document_factory.h"
#include "../common/selection_box.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"

#include <memory>

namespace spright
{
namespace editor
{
    class NewDrawingTool : public Tool
    {
    public:
        NewDrawingTool(DocumentStore *documentStore, DocumentFactory *documentFactory);

        void pointerDown(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

    private:
        SelectionBox m_SelectionBox;

        DocumentStore *m_DocumentStore;

        DocumentFactory *m_DocumentFactory;
    };
} // namespace editor
} // namespace spright
