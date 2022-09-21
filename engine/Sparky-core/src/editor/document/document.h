#pragma once

#include "../../graphics/layers/layer.h"
#include "../../graphics/layers/tileLayer.h"

namespace my_app { namespace editor { namespace document {
	class Document
	{
	private:
		sparky::graphics::Layer* m_TempLayer;
		sparky::graphics::TileLayer* m_TileLayer;

	public:
		Document(sparky::graphics::TileLayer* tileLayer, sparky::graphics::Layer* tempLayer);
		~Document();
		
		inline sparky::graphics::TileLayer* getActiveTileLayer() {
			return m_TileLayer;
		}

		 inline sparky::graphics::Layer* getTempLayer() {
		 	return m_TempLayer;
		 }

		void render();
	};
}}}


