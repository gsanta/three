#pragma once

#include "../../document/document.h"
#include "undoable.h"

#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    class DocumentHistory
    {

    public:
        void add(std::shared_ptr<Undoable> undoable);
        void mergeToTop(const Undoable &undoable);

        void undo(Document &document);

        void redo(Document &document);

        Undoable *peek();

        size_t undoSize();

        size_t redoSize();

    private:
        std::vector<std::shared_ptr<Undoable>> m_UndoList;

        std::vector<std::shared_ptr<Undoable>> m_RedoList;
    };
} // namespace editor
} // namespace spright
