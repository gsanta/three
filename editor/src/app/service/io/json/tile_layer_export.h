#pragma once
#include <nlohmann/json.hpp>
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../document/document.h"
#include "../../../document/document_handler.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class TileLayerExport {
	public:
		nlohmann::json exportLayer(Document* document, std::string layerId);
		TileLayer* importLayer(DocumentHandler* documentHandler, nlohmann::json json);
	};
}}