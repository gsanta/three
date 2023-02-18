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

	TileLayer* DocumentHandler::createUserLayer(Document* document, std::string name, std::string id)
	{
#ifdef SPARKY_EMSCRIPTEN
		shared_ptr<GLShader> shaderUnlit = make_shared<GLShader>("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		shared_ptr<Shader> shaderUnlit = make_shared<GLShader>("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer *layer = new TileLayer(name, id, new Group(new GLRenderer2D(shaderUnlit)), document);

		document->getLayerHandler()->addLayer(layer);

		if (document->getLayerHandler()->getLayers().size() == 1)
		{
			document->getLayerHandler()->setActiveLayer(layer->getId());
		}

		return layer;
	}

	Document* DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		shared_ptr<GLShader> shaderUnlit = make_shared<GLShader>("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		shared_ptr<GLShader> shaderUnlit =  make_shared<GLShader>("shaders/basic.vert", "shaders/unlit.frag");
#endif
		float pixelCount = 32.0f;
		Dimensions documentDimensions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Camera *camera = new Camera(m_Window->getWidth(), m_Window->getHeight(), documentDimensions, -1.0f, 1.0f);
		Document *document = new Document(documentDimensions, camera);

		TileLayer *tempLayer = new TileLayer("", DEFAULT_TEMP_LAYER_ID, new Group(new GLRenderer2D(shaderUnlit)), document);
		TileLayer *backgroundLayer = new TileLayer("", DEFAULT_BACKGROUND_LAYER_ID, new Group(new GLRenderer2D(shaderUnlit)), document, 2.0f);

		document->getLayerHandler()->addBeforeLayer(backgroundLayer);
		document->getLayerHandler()->addAfterLayer(tempLayer);

		Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);

		return document;
	}
}}
