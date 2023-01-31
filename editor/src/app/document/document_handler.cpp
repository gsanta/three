#include "document_handler.h"

namespace spright
{
	namespace document
	{

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
			engine::graphics::Shader *shaderUnlit = new engine::graphics::Shader("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
			engine::graphics::Shader *shaderUnlit = new engine::graphics::Shader("shaders/basic.vert", "shaders/unlit.frag");
#endif
			TileLayer *layer = new TileLayer(name, id, shaderUnlit, new BatchRenderer2D(), getActiveDocument()->getCamera(), getActiveDocument()->dimensions);

			m_ActiveDocument->getLayerHandler()->addLayer(layer);

			if (m_ActiveDocument->getLayerHandler()->getLayers().size() == 1)
			{
				m_ActiveDocument->getLayerHandler()->setActiveLayer(layer->getId());
			}
		}

		Dimensions DocumentHandler::getCameraDimensions(Dimensions docDimensions)
		{
			float ratio = m_Window->getRatio();

			float width;
			float height;

			if (docDimensions.getWidth() / ratio > docDimensions.getHeight())
			{
				width = docDimensions.getWidth();
				height = width / ratio;
			}
			else
			{
				height = docDimensions.getHeight();
				width = height * ratio; // docDimensions.getRatio();
			}

			return Dimensions(-width / 2.0f, width / 2.0f, -height / 2.0f, height / 2.0f);
		}

		void DocumentHandler::createDocument()
		{
#ifdef SPARKY_EMSCRIPTEN
			Shader *shader = new Shader("resources/shaders/basic.es3.vert", "resources/shaders/basic.es3.frag");
			Shader *shaderUnlit = new Shader("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
			Shader *shader = new Shader("shaders/basic.vert", "shaders/basic.frag");
			Shader *shaderUnlit = new Shader("shaders/basic.vert", "shaders/unlit.frag");
#endif
			float pixelCount = 32.0f;
			float height = 1.0f / m_Window->getRatio() * pixelCount;
			Dimensions dimensions(-pixelCount / 2.0f, pixelCount / 2.0f, -pixelCount / 2.0f, pixelCount / 2.0f);
			Dimensions cameraDimensions = getCameraDimensions(dimensions);
			Canvas *canvas = new Canvas(pixelCount * 2.0f, pixelCount * 2.0f);
			Camera *camera = new Camera(m_Window, engine::graphics::OrthoProjectionInfo(cameraDimensions.left, cameraDimensions.right, cameraDimensions.bottom, cameraDimensions.top));
			Document *document = new Document(dimensions, camera, canvas);

			TileLayer *tempLayer = new TileLayer("", DEFAULT_TEMP_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions);
			TileLayer *backgroundLayer = new TileLayer("", DEFAULT_BACKGROUND_LAYER_ID, shaderUnlit, new BatchRenderer2D(), document->getCamera(), dimensions, 2.0f);

			document->getLayerHandler()->addBeforeLayer(backgroundLayer);
			document->getLayerHandler()->addAfterLayer(tempLayer);

			spright::document::Checkerboard checkerboard;

			checkerboard.create(document);

			m_documents.push_back(document);
			m_ActiveDocument = document;
		}
	}
}
