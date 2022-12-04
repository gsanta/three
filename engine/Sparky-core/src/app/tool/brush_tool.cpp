#include "brush_tool.h"

namespace spright_app { namespace tool {

	BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, spright_app::Services* services, EventHandler* eventHandler)
			: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), m_Services(services), m_EventHandler(eventHandler), Tool("brush")
	{
	}

	void BrushTool::setSize(int size)
	{
		m_Size = size;
	}

	void BrushTool::pointerDown(PointerInfo &pointerInfo)
	{
		std::string userLayer1Id = USER_LAYER_ID_PREFIX + "1";
		std::string userLayer2Id = USER_LAYER_ID_PREFIX + "2";

		std::string layerId;
		std::string otherLayerId;

		if (pointerInfo.isLeftButtonDown() == false) {
			return;
		}

		spright_engine::graphics::Camera* camera = m_documentHandler->getActiveDocument()->getCamera();
		
		spright_engine::maths::Vec2 center2D = camera->getCenter2D();

		float zoom = camera->getZoom();

		spright_engine::maths::Vec3 la = spright_engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0.5f);
		spright_engine::maths::Vec3 lb = spright_engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0);
		spright_engine::maths::Vec3 p1 = spright_engine::maths::Vec3(-1, 1, 0);
		spright_engine::maths::Vec3 p2 = spright_engine::maths::Vec3(1, 1, 0);
		spright_engine::maths::Vec3 p3 = spright_engine::maths::Vec3(0, -1, 0);

		spright_engine::maths::Vec3 intersection = spright_engine::maths::linePlaneIntersection(la, lb, p1, p2, p3);

		spright_engine::graphics::TileLayer *tileLayer = dynamic_cast<spright_engine::graphics::TileLayer *>(m_documentHandler->getActiveDocument()->getActiveLayer());

		spright_engine::maths::Vec2 tilePos = tileLayer->getBottomLeftPos(spright_engine::maths::Vec2(intersection.x, intersection.y));
		
		for (int i = 0; i < m_Size; i++) {
			for (int j = 0; j < m_Size; j++) {

				spright_engine::maths::Vec2 actTilePos = spright_engine::maths::Vec2(tilePos.x, tilePos.y).subtract(spright_engine::maths::Vec2(i * tileLayer->getTileSize(), j * tileLayer->getTileSize()));

				int color = m_Services->getColorPalette()->color;
				spright_engine::graphics::Sprite *sprite = new spright_engine::graphics::Sprite(actTilePos.x, actTilePos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
				tileLayer->add(sprite);
			}
		}

		m_EventHandler->emitDataChange();
	}
}}
