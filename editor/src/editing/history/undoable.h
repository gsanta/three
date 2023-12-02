#pragma once

#include "../document/document.h"

#include <memory>

namespace spright
{
namespace editing
{
    class Undoable
    {
    public:
        virtual void undo(Document &document) const = 0;

        virtual void redo(Document &document) const = 0;
    };
} // namespace editing
} // namespace spright
