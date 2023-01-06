#pragma once
#include <nlohmann/json.hpp>
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../document/document_handler.h"

namespace spright {
	using namespace ::engine::graphics;
	using namespace document;

	class TileLayerExport {
		DocumentHandler* m_DocumentHandler;

	public:
		TileLayerExport(DocumentHandler* documentHandler);
		nlohmann::json exportLayer(TileLayer* layer);
		TileLayer* importLayer(nlohmann::json json);
	};
}