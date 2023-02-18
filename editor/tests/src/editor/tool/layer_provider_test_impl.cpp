#include "./layer_provider_test_impl.h"

namespace spright { namespace editor {
	LayerProviderTestImpl::LayerProviderTestImpl(TileLayer& activeLayer, TileLayer& tempLayer): m_ActiveLayer(activeLayer), m_TempLayer(tempLayer) {

	}

	TileLayer& LayerProviderTestImpl::getActiveLayer()
	{
		return m_ActiveLayer;
	}

	TileLayer& LayerProviderTestImpl::getTempLayer()
	{
		return m_TempLayer;
	}
}}