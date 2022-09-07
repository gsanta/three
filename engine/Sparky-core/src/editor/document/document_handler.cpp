#include "document_handler.h"

namespace my_app { namespace editor { namespace document {
	
	DocumentHandler::~DocumentHandler()
	{
		for (Document* document : m_documents) {
			delete document;
		}
	}

	void DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		sparky::graphics::Shader* shader = new sparky::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");
#else
		sparky::graphics::Shader* shader = new sparky::graphics::Shader("src/shaders/basic.vert", "src/shaders/basic.frag");
#endif

		sparky::graphics::TileLayer* layer = new sparky::graphics::TileLayer(shader);

		Document* document = new Document(layer);
		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}}