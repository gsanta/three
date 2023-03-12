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

	TileLayer& DocumentHandler::createUserLayer(Document* document, std::string name, std::string id)
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer layer(name, id, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());

		document->getActiveFrame().addLayer(std::move(layer));

		if (document->getActiveFrame().getLayers().size() == 1)
		{
			document->getActiveFrame().setActiveLayer(document->getActiveFrame().getLayer(id));
		}

		return layer;
	}

	Document* DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		float pixelCount = 32.0f;
		Dimensions documentDimensions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Camera *camera = new Camera(m_Window->getWidth(), m_Window->getHeight(), documentDimensions, -1.0f, 1.0f);
		Document *document = new Document(documentDimensions, camera);

		TileLayer layer("layer1", USER_LAYER_ID_PREFIX + "1", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());
		TileLayer layer2("layer2", USER_LAYER_ID_PREFIX + "2", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());
		TileLayer tempLayer("", DEFAULT_TEMP_LAYER_ID, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());
		TileLayer backgroundLayer("", DEFAULT_BACKGROUND_LAYER_ID, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions(), 2.0f);

		FrameImpl frame(0);
		frame.addLayer(layer);
		frame.addLayer(layer2);

		document->getFrameStore().addFrame(std::move(frame));
		document->getActiveFrame().addBackgroundLayer(std::move(backgroundLayer));
		document->getActiveFrame().addForegroundLayer(std::move(tempLayer));

		Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);

		return document;
	}
}}
