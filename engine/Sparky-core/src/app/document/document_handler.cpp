#include "document_handler.h"

namespace spright { namespace document {
	
	DocumentHandler::DocumentHandler(Window* window) : m_Window(window) {


	}

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
		TileLayer* layer = new TileLayer(name, id, shaderUnlit, new BatchRenderer2D(), getActiveDocument()->getCamera(), getActiveDocument()->dimensions);

		m_ActiveDocument->addUserLayer(layer);

		if (m_ActiveDocument->getUserLayers().size() == 1) {
			m_ActiveDocument->setActiveLayer(layer->getId());
		}
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
		Dimensions dimensions(-16.0f, 16.0f, -16.0f, 16.0f);
		Camera* camera = new Camera(m_Window, engine::graphics::OrthoProjectionInfo(dimensions.left, dimensions.right, dimensions.bottom, dimensions.top));
		Document* document = new Document(dimensions, camera);

		TileLayer* tempLayer = new TileLayer("", DEFAULT_TEMP_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);
		TileLayer* backgroundLayer = new TileLayer("", DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);

		document->addBeforeLayer(backgroundLayer);
		document->addAfterLayer(tempLayer);

		spright::document::Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}