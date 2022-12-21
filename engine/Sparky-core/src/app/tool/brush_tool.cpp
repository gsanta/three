#include "brush_tool.h"

namespace spright { namespace tool {

	BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, spright::Services* services, EventHandler* eventHandler)
			: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), m_Services(services), m_EventHandler(eventHandler), Tool("brush")
	{
	}

	void BrushTool::setSize(int size)
	{
		m_Size = size;
	}

	void BrushTool::pointerMove(PointerInfo &pointerInfo)
	{
		draw(pointerInfo);
	}

	void BrushTool::pointerDown(PointerInfo& pointerInfo)
	{
		draw(pointerInfo);
	}

	void BrushTool::draw(PointerInfo& pointerInfo) {
		if (pointerInfo.isLeftButtonDown() == false) {
			return;
		}

		std::string userLayer1Id = USER_LAYER_ID_PREFIX + "1";
		std::string userLayer2Id = USER_LAYER_ID_PREFIX + "2";

		std::string layerId;
		std::string otherLayerId;

		engine::graphics::Camera* camera = m_documentHandler->getActiveDocument()->getCamera();

		Vec2 center2D = camera->getCenter2D();

		float zoom = camera->getZoom();

		engine::maths::Vec3 la = engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0.5f);
		engine::maths::Vec3 lb = engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0);
		engine::maths::Vec3 p1 = engine::maths::Vec3(-1, 1, 0);
		engine::maths::Vec3 p2 = engine::maths::Vec3(1, 1, 0);
		engine::maths::Vec3 p3 = engine::maths::Vec3(0, -1, 0);

		engine::maths::Vec3 intersection = engine::maths::linePlaneIntersection(la, lb, p1, p2, p3);

		engine::graphics::TileLayer* tileLayer = dynamic_cast<engine::graphics::TileLayer*>(m_documentHandler->getActiveDocument()->getActiveLayer());

		Vec2 tilePos = tileLayer->getBottomLeftPos(Vec2(intersection.x, intersection.y));

		for (int i = 0; i < m_Size; i++) {
			for (int j = 0; j < m_Size; j++) {
				Vec2 model = camera->screenToModel(pointerInfo.curr);
				engine::maths::Vec2Int tilePos = tileLayer->getTilePos(model);

				setColor(tileLayer, tilePos);
			}
		}

		m_EventHandler->emitDataChange();
	}

	void BrushTool::setColor(TileLayer* tileLayer, Vec2Int tilePos)
	{
		int color = m_Services->getColorPalette()->color;

		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable == nullptr) {
			Vec2 worldPos = tileLayer->getBottomLeftPos(tileIndex);
			engine::graphics::Sprite* sprite = new engine::graphics::Sprite(worldPos.x, worldPos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
			tileLayer->add(sprite);
		}
		else {
			renderable->setColor(color);
		}
	}
}}
