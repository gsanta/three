#pragma once
#include "../src/app/tool/helper/layer_provider.h"

namespace spright { namespace editor {

	class LayerProviderTestImpl : public LayerProvider {
	private:
		TileLayer& m_ActiveLayer;
		TileLayer& m_TempLayer;
	
	public:
		LayerProviderTestImpl(TileLayer& activeLayer, TileLayer& tempLayer);

		TileLayer& getActiveLayer() override;
		TileLayer& getTempLayer() override;
	};
}}