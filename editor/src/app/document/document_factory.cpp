#include "document_factory.h"

namespace spright { namespace editor {

	DocumentFactory::DocumentFactory(Window* window) : m_Window(window)
	{
	}

	DocumentFactory::~DocumentFactory()
	{
		for (Document* document : m_documents)
		{
			delete document;
		}
	}

	TileLayer& DocumentFactory::createUserLayer(Document* document, std::string name, std::string id)
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

	Document* DocumentFactory::createDocument()
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

		TileLayer tempLayer("", DEFAULT_TEMP_LAYER_ID, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());
		TileLayer backgroundLayer("", DEFAULT_BACKGROUND_LAYER_ID, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions(), 2.0f);

		FrameImpl frame(0);

		document->getFrameStore().addFrame(frame);
		document->getActiveFrame().addBackgroundLayer(backgroundLayer);
		document->getActiveFrame().addForegroundLayer(tempLayer);

		Checkerboard checkerboard;

		checkerboard.create(document);

		m_documents.push_back(document);

		return document;
	}
}}
