#pragma once

#include "../../graphics/layers/layer.h"

namespace my_app { namespace editor { namespace document {
	class Document
	{
	private:
		sparky::graphics::Layer* m_Layer;
		 sparky::graphics::Layer* m_TempLayer;

	public:
		Document(sparky::graphics::Layer* layer, sparky::graphics::Layer* tempLayer);
		Document(sparky::graphics::Layer* layer);
		~Document();
		
		inline sparky::graphics::Layer* getLayer() {
			return m_Layer;
		}

		 inline sparky::graphics::Layer* getTempLayer() {
		 	return m_TempLayer;
		 }

		void render();
	};
}}}


