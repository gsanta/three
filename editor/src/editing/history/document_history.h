#pragma once

#include "../document/document.h"
#include "undoable.h"

#include <memory>
#include <vector>

namespace spright
{
namespace editing
{
    class DocumentHistory
    {

    public:
        void add(std::shared_ptr<Undoable> undoable);

        void undo(Document &document);

        void redo(Document &document);

        Undoable *peek();

        void pop();

        size_t undoSize();

        size_t redoSize();

    private:
        std::vector<std::shared_ptr<Undoable>> m_UndoList;

        std::vector<std::shared_ptr<Undoable>> m_RedoList;
    };
} // namespace editing
} // namespace spright
