#pragma once
#include <nlohmann/json.hpp>
#include "../../../document/document.h"
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "tile_layer_export.h"
#include "../../../document/document_handler.h"

namespace spright { namespace editor {

	class JsonIO {
	private:
		TileLayerExport* m_TileLayerExport;
		int m_i;

	public:
		JsonIO();
		std::string exportDocument(Document* document);
		void importDocument(DocumentHandler* documentHandler, std::string string);
	};
}}