#pragma once
#include "../../../engine/graphics/colors.h"
#include "../../../engine/scene/containers/tile_layer.h"
#include "../../document/document.h"
#include "../../document/factory/document_factory.h"

#include <nlohmann/json.hpp>

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class TileLayerExport
    {
    public:
        TileLayerExport(std::shared_ptr<DocumentFactory> documentFactory);

        nlohmann::json exportLayer(const TileLayer &layer) const;

        TileLayer importLayer(nlohmann::json json) const;

    private:
        std::shared_ptr<DocumentFactory> m_DocumentFactory;
    };
} // namespace editing
} // namespace spright
