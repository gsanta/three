#include "document_handler.h"

namespace spright { namespace editor {

	DocumentHandler::DocumentHandler(Window *window) : m_Window(window)
	{
	}

	DocumentHandler::~DocumentHandler()
	{
		for (Document *document : m_documents)
		{
			delete document;
		}
	}

	void DocumentHandler::createUserLayer(std::string name, std::string id)
	{
#ifdef SPARKY_EMSCRIPTEN
		Shader *shaderUnlit = new GLShader("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		Shader *shaderUnlit = new GLShader("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer *layer = new TileLayer(name, id, m_ActiveDocument, shaderUnlit, new GLRenderer2D(), getActiveDocument()->getCamera());

		m_ActiveDocument->getLayerHandler()->addLayer(layer);

		if (m_ActiveDocument->getLayerHandler()->getLayers().size() == 1)
		{
			m_ActiveDocument->getLayerHandler()->setActiveLayer(layer->getId());
		}
	}

	void DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		Shader *shader = new GLShader("resources/shaders/basic.es3.vert", "resources/shaders/basic.es3.frag");
		Shader *shaderUnlit = new GLShader("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		Shader *shader = new GLShader("shaders/basic.vert", "shaders/basic.frag");
		Shader *shaderUnlit = new GLShader("shaders/basic.vert", "shaders/unlit.frag");
#endif
		float pixelCount = 32.0f;
		Dimensions documentDimensions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Camera *camera = new Camera(m_Window->getWidth(), m_Window->getHeight(), documentDimensions, -1.0f, 1.0f);
		Document *document = new Document(documentDimensions, camera);

		TileLayer *tempLayer = new TileLayer("", DEFAULT_TEMP_LAYER_ID, document, shaderUnlit, new GLRenderer2D(), document->getCamera());
		TileLayer *backgroundLayer = new TileLayer("", DEFAULT_BACKGROUND_LAYER_ID, document, shaderUnlit, new GLRenderer2D(), document->getCamera(), 2.0f);

		document->getLayerHandler()->addBeforeLayer(backgroundLayer);
		document->getLayerHandler()->addAfterLayer(tempLayer);

		Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}
