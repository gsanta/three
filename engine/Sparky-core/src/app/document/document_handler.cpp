#include "document_handler.h"

namespace spright_app { namespace document {
	
	DocumentHandler::~DocumentHandler()
	{
		for (Document* document : m_documents) {
			delete document;
		}
	}

	void DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		spright_engine::graphics::Shader* shader = new spright_engine::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");
		spright_engine::graphics::Shader* shaderUnlit = new spright_engine::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic_unlit.es3.frag");
#else
		spright_engine::graphics::Shader* shader = new spright_engine::graphics::Shader("src/shaders/basic.vert", "src/shaders/basic.frag");
		spright_engine::graphics::Shader* shaderUnlit = new spright_engine::graphics::Shader("src/shaders/basic.vert", "src/shaders/unlit.frag");
#endif
		spright_app::document::Dimensions dimensions(-16.0f, 16.0f, -9.0f, 9.0f);
		Document* document = new Document(dimensions);

		std::string userLayer1Id = USER_LAYER_ID_PREFIX + "1";
		spright_engine::graphics::TileLayer* userLayer1 = new spright_engine::graphics::TileLayer(userLayer1Id, shaderUnlit, new spright_engine::graphics::BatchRenderer2D(), document->getCamera());
		spright_engine::graphics::TileLayer* tempLayer = new spright_engine::graphics::TileLayer(DEFAULT_TEMP_LAYER_ID, shaderUnlit, new spright_engine::graphics::BatchRenderer2D(), document->getCamera());
		spright_engine::graphics::TileLayer* backgroundLayer = new spright_engine::graphics::TileLayer(DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit, new spright_engine::graphics::BatchRenderer2D(), document->getCamera());

		document->addLayer(backgroundLayer);
		document->addLayer(userLayer1);
		document->addLayer(tempLayer);

		document->setActiveLayer(userLayer1Id);

		spright_app::document::Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}