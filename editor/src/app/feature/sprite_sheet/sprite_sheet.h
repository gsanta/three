#pragma once
#include "../../algorithm/tile_operations.h"
#include "../../document/document.h"
#include "../../document/drawing.h"
#include "../../document/factory/document_factory.h"

#include <memory.h>

namespace spright
{
namespace editor
{
    /**
     * This class represents an exported sprite sheet within the document.
     * A sprite sheet can be exported from a regular drawing with multiple frames and unfolds all of the frames
     * onto a single-frame drawing.
    */
    class SpriteSheet
    {
    public:
        SpriteSheet(std::shared_ptr<DocumentFactory> documentFactory, Document *document);

        Drawing &generateSpriteSheet(Drawing &drawing);

    private:
        std::shared_ptr<DocumentFactory> m_DocumentFactory;

        Document *m_Document;
    };
} // namespace editor
} // namespace spright
