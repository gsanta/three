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

		spright_engine::graphics::Camera* camera = m_documentHandler->getActiveDocument()->getCamera();

		spright_engine::maths::Vec2 center2D = camera->getCenter2D();

		float zoom = camera->getZoom();

		spright_engine::maths::Vec3 la = spright_engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0.5f);
		spright_engine::maths::Vec3 lb = spright_engine::maths::Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0);
		spright_engine::maths::Vec3 p1 = spright_engine::maths::Vec3(-1, 1, 0);
		spright_engine::maths::Vec3 p2 = spright_engine::maths::Vec3(1, 1, 0);
		spright_engine::maths::Vec3 p3 = spright_engine::maths::Vec3(0, -1, 0);

		spright_engine::maths::Vec3 intersection = spright_engine::maths::linePlaneIntersection(la, lb, p1, p2, p3);

		spright_engine::graphics::TileLayer* tileLayer = dynamic_cast<spright_engine::graphics::TileLayer*>(m_documentHandler->getActiveDocument()->getActiveLayer());

		spright_engine::maths::Vec2 tilePos = tileLayer->getBottomLeftPos(spright_engine::maths::Vec2(intersection.x, intersection.y));

		for (int i = 0; i < m_Size; i++) {
			for (int j = 0; j < m_Size; j++) {
				spright_engine::maths::Vec2 model = camera->screenToModel(pointerInfo.curr);
				spright_engine::maths::Vec2Int tilePos = tileLayer->getTilePos(model);

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
			spright_engine::maths::Vec2 worldPos = tileLayer->getBottomLeftPos(tileIndex);
			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(worldPos.x, worldPos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
			tileLayer->add(sprite);
		}
		else {
			renderable->setColor(color);
		}
	}
}}
