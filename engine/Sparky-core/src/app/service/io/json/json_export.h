#pragma once
#include <nlohmann/json.hpp>
#include "../../../document/document.h"
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "tile_layer_export.h"

namespace spright {
	using namespace document;

	class JsonExport {
	private:
		TileLayerExport m_TileLayerExport;

	public:
		JsonExport();
		nlohmann::json exportDocument(Document* document);
	};
}