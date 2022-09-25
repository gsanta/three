#include "document.h"

namespace my_app { namespace editor { namespace document {

	Document::Document(sparky::graphics::TileLayer* layer, sparky::graphics::Layer* tempLayer, sparky::graphics::TileLayer* backgroundLayer)
		: m_TileLayer(layer), m_TempLayer(tempLayer), m_BackgroundLayer(backgroundLayer)
	{

	}

	Document::~Document() {
		delete m_TileLayer;
		delete m_TempLayer;
	}

	void Document::render()
	{
		if (this->m_TileLayer != nullptr) {
			this->m_TileLayer->render();
		}

		 if (this->m_TempLayer != nullptr) {
		 	this->m_TempLayer->render();
		 }
	}
}}}
