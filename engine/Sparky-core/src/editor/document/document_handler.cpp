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
		my_app::graphics::Shader* shader = new my_app::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");
		my_app::graphics::Shader* shaderUnlit = new my_app::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic_unlit.es3.frag");
#else
		my_app::graphics::Shader* shader = new my_app::graphics::Shader("src/shaders/basic.vert", "src/shaders/basic.frag");
		my_app::graphics::Shader* shaderUnlit = new my_app::graphics::Shader("src/shaders/basic.vert", "src/shaders/unlit.frag");
#endif

		my_app::graphics::TileLayer* layer = new my_app::graphics::TileLayer(USER_LAYER_ID_PREFIX + "1", shader);
		my_app::graphics::TileLayer* tempLayer = new my_app::graphics::TileLayer(DEFAULT_TEMP_LAYER_ID, shaderUnlit);
		my_app::graphics::TileLayer* backgroundLayer = new my_app::graphics::TileLayer(DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit);

		Document* document = new Document(std::vector<my_app::graphics::Layer*> { layer, tempLayer, backgroundLayer });
		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}}