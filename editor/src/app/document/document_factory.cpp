#include "document_factory.h"

namespace spright { namespace editor {

	DocumentFactory::DocumentFactory(Window* window, EventEmitter* eventEmitter) : m_Window(window), m_EventEmitter(eventEmitter)
	{
	}

	DocumentFactory::~DocumentFactory()
	{
		for (Document* document : m_documents)
		{
			delete document;
		}
	}

	void DocumentFactory::createUserLayer(Document* document, std::string name)
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer layer(name, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), document->getDimensions());

		for (Frame& frame : document->getFrameStore().getFrames()) {
			frame.addLayer(std::move(layer));
		}
	}

	void DocumentFactory::createFrame(Document* document) {
		FrameImpl frame(0);

		Frame& activeFrame = document->getFrameStore().getActiveFrame();

		for (TileLayer& layer : activeFrame.getLayers()) {
			frame.addLayer(layer);
		}

		document->getFrameStore().addFrame(std::move(frame));
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
		Document *document = new Document(documentBounds, camera, m_EventEmitter);

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
