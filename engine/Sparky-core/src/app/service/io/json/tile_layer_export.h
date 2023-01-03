#pragma once
#include <nlohmann/json.hpp>
#include "../../../../engine/graphics/layer/tileLayer.h"

namespace spright {
	using namespace ::engine::graphics;

	class TileLayerExport {


	public:
		nlohmann::json exportLayer(TileLayer* layer);
		//TileLayer* importLayer(std::string str);
	};
}