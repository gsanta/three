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

		my_app::graphics::TileLayer* layer = new my_app::graphics::TileLayer(USER_LAYER_ID_PREFIX + "1", shader, new my_app::graphics::BatchRenderer2D());
		my_app::graphics::TileLayer* tempLayer = new my_app::graphics::TileLayer(DEFAULT_TEMP_LAYER_ID, shaderUnlit, new my_app::graphics::BatchRenderer2D());
		my_app::graphics::TileLayer* backgroundLayer = new my_app::graphics::TileLayer(DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit, new my_app::graphics::BatchRenderer2D());
		backgroundLayer->add(new my_app_engine::graphics::LineShape(5.0f, 5.0f, 0, 0, 0.5f, 0Xffff00ff));

		Document* document = new Document(std::vector<my_app::graphics::Layer*> { layer, tempLayer, backgroundLayer });
		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}}