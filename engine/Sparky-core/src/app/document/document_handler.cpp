#include "document_handler.h"

namespace spright { namespace document {
	
	DocumentHandler::~DocumentHandler()
	{
		for (Document* document : m_documents) {
			delete document;
		}
	}

	void DocumentHandler::createUserLayer(std::string name, std::string id) {
#ifdef SPARKY_EMSCRIPTEN
		engine::graphics::Shader* shaderUnlit = new engine::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic_unlit.es3.frag");
#else
		engine::graphics::Shader* shaderUnlit = new engine::graphics::Shader("src/shaders/basic.vert", "src/shaders/unlit.frag");
#endif
		TileLayer* userLayer1 = new TileLayer(name, id, shaderUnlit, new BatchRenderer2D(), getActiveDocument()->getCamera(), getActiveDocument()->dimensions);
	}

	void DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		Shader* shader = new Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");
		Shader* shaderUnlit = new Shader("res/shaders/basic.es3.vert", "res/shaders/basic_unlit.es3.frag");
#else
		Shader* shader = new Shader("src/shaders/basic.vert", "src/shaders/basic.frag");
		Shader* shaderUnlit = new Shader("src/shaders/basic.vert", "src/shaders/unlit.frag");
#endif
		Dimensions dimensions(-16.0f, 16.0f, -9.0f, 9.0f);
		Document* document = new Document(dimensions);

		std::string userLayer1Id = USER_LAYER_ID_PREFIX + "1";
		std::string userLayer2Id = USER_LAYER_ID_PREFIX + "2";
		TileLayer* userLayer1 = new TileLayer("layer1", userLayer1Id, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);
		TileLayer* userLayer2 = new TileLayer("layer2", userLayer2Id, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);
		TileLayer* tempLayer = new TileLayer("", DEFAULT_TEMP_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);
		TileLayer* backgroundLayer = new TileLayer("", DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);

		document->addBeforeLayer(backgroundLayer);
		document->addUserLayer(userLayer1);
		document->addUserLayer(userLayer2);
		document->addAfterLayer(tempLayer);

		document->setActiveLayer(userLayer1Id);

		spright::document::Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}