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

	TileLayer& DocumentFactory::createUserLayer(Document* document, std::string name)
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer layer(name, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());

		return document->getActiveFrame().addLayer(std::move(layer));
	}

	Document* DocumentFactory::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		float pixelCount = 32.0f;
		Bounds documentBounds = Bounds::createWithPositions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Camera *camera = new Camera(m_Window->getWidth(), m_Window->getHeight(), documentBounds, -1.0f, 1.0f);
		Document *document = new Document(documentBounds, camera);

		TileLayer tempLayer("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());
		TileLayer backgroundLayer("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions(), 2.0f);

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
