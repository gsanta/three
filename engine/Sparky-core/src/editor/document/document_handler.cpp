#include "document_handler.h"

namespace my_app { namespace editor { namespace document {
	
	DocumentHandler::~DocumentHandler()
	{
		for (Document* document : m_documents) {
			delete document;
		}
	}

	void DocumentHandler::createDocument()
	{
#ifdef SPARKY_EMSCRIPTEN
		my_app::graphics::Shader* shader = new my_app::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");
		my_app::graphics::Shader* shaderUnlit = new my_app::graphics::Shader("res/shaders/basic.es3.vert", "res/shaders/basic_unlit.es3.frag");
#else
		my_app::graphics::Shader* shader = new my_app::graphics::Shader("src/shaders/basic.vert", "src/shaders/basic.frag");
		my_app::graphics::Shader* shaderUnlit = new my_app::graphics::Shader("src/shaders/basic.vert", "src/shaders/unlit.frag");
#endif
		my_app_editor::document::Dimensions dimensions(-16.0f, 16.0f, -9.0f, 9.0f);
		Document* document = new Document(dimensions);

		maths::Mat4 projection = maths::Mat4::otrthographic(dimensions.left, dimensions.right, dimensions.bottom, dimensions.top, -1.0f, 1.0f);
		
		std::string userLayer1Id = USER_LAYER_ID_PREFIX + "1";
		my_app::graphics::TileLayer* userLayer1 = new my_app::graphics::TileLayer(userLayer1Id, projection, shaderUnlit, new my_app::graphics::BatchRenderer2D());
		my_app::graphics::TileLayer* tempLayer = new my_app::graphics::TileLayer(DEFAULT_TEMP_LAYER_ID, projection, shaderUnlit, new my_app::graphics::BatchRenderer2D());
		my_app::graphics::TileLayer* backgroundLayer = new my_app::graphics::TileLayer(DEFAULT_BACKGROUND_LAYER_ID, projection, shaderUnlit, new my_app::graphics::BatchRenderer2D());

		document->addLayer(backgroundLayer);
		document->addLayer(userLayer1);
		document->addLayer(tempLayer);

		document->setActiveLayer(userLayer1Id);

		my_app_editor::document::Checkerboard checkerboard;

		checkerboard.create(document);

		backgroundLayer->add(new my_app_engine::graphics::LineShape(5.0f, 5.0f, 0, 0, 0.5f, 0Xffff00ff));

		m_documents.push_back(document);
		m_ActiveDocument = document;
	}
}}}