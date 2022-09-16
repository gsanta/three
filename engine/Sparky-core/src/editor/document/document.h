#pragma once

#include "../../graphics/layers/layer.h"

namespace my_app { namespace editor { namespace document {
	class Document
	{
	private:
		sparky::graphics::Layer* m_Layer;

	public:
		Document(sparky::graphics::Layer* layer);
		~Document();
		inline sparky::graphics::Layer* getLayer() {
			return m_Layer;
		}
		void render();
	};
}}}


