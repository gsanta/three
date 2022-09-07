#include "document.h"

namespace my_app { namespace editor { namespace document {

	Document::Document(sparky::graphics::Layer* layer)
	: m_Layer(layer)
	{

	}

	Document::~Document() {
		delete m_Layer;
	}

	void Document::render()
	{
		if (this->m_Layer != nullptr) {
			this->m_Layer->render();
		}
		//shader->enable();

		//shader->setUniform2f("light_pos", Vec2(4.0f, 1.5f));
	}
}}}
