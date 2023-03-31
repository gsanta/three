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

	void DocumentFactory::createUserLayer(Drawing* drawing, std::string name)
	{
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
		TileLayer layer(name, Group<Rect2D>(new GLRenderer2D(shaderUnlit)), drawing->getBounds());

		for (Frame& frame : drawing->getFrameStore().getFrames()) {
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
		Document *document = new Document(documentBounds);

		Camera *camera = new Camera(m_Window->getWidth(), m_Window->getHeight(), documentBounds, -1.0f, 1.0f);

		Bounds drawingBounds = Bounds::createWithPositions(-16.0f, -10.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Drawing* drawing1 = new Drawing(drawingBounds, camera, m_EventEmitter);
		document->addDrawing(drawing1);

		TileLayer tempLayer("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), drawingBounds);
		TileLayer backgroundLayer("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), drawingBounds, 2.0f);

		FrameImpl frame(0);

		drawing1->getFrameStore().addFrame(frame);
		drawing1->getActiveFrame().addBackgroundLayer(backgroundLayer);
		drawing1->getActiveFrame().addForegroundLayer(tempLayer);

		Bounds drawingBounds2 = Bounds::createWithPositions(2.0f, pixelCount / 5.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
		Drawing* drawing2 = new Drawing(drawingBounds2, camera, m_EventEmitter);
		document->addDrawing(drawing2);

		TileLayer tempLayer2("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), drawingBounds2);
		TileLayer backgroundLayer2("", Group<Rect2D>(new GLRenderer2D(shaderUnlit)), drawingBounds2, 2.0f);

		drawing2->getFrameStore().addFrame(frame);
		drawing2->getActiveFrame().addBackgroundLayer(backgroundLayer2);
		drawing2->getActiveFrame().addForegroundLayer(tempLayer2);

		Checkerboard checkerboard;

		checkerboard.create(drawing1->getBackgroundLayer());
		checkerboard.create(drawing2->getBackgroundLayer());

		m_documents.push_back(document);

		return document;
	}
}}
