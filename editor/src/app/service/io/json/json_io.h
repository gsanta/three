#pragma once
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../document/document.h"
#include "../../../document/factory/document_factory.h"
#include "tile_layer_export.h"

#include <nlohmann/json.hpp>

namespace spright
{
namespace editor
{

    class JsonIO
    {

    public:
        JsonIO(std::shared_ptr<DocumentFactory> documentHandler);

        ~JsonIO();

        nlohmann::json exportDocument(Document &document);

        Document importDocument(std::string string) const;

    private:
        std::shared_ptr<DocumentFactory> m_DocumentFactory;

        TileLayerExport *m_TileLayerExport;

        int m_i;
    };
} // namespace editor
} // namespace spright
