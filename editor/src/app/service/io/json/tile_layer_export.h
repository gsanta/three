#pragma once
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../core/colors.h"
#include "../../../document/document.h"
#include "../../../document/factory/document_factory.h"

#include <nlohmann/json.hpp>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class TileLayerExport
    {
        DocumentFactory *m_DocumentFactory;

    public:
        TileLayerExport(DocumentFactory *documentHandler);
        nlohmann::json exportLayer(const TileLayer &layer) const;
        TileLayer importLayer(nlohmann::json json) const;
    };
} // namespace editor
} // namespace spright
