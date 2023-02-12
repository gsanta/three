#include "brush_tool.h"

namespace spright { namespace editor {

	BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, Services* services, EventHandler* eventHandler)
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

		Camera* camera = m_documentHandler->getActiveDocument()->getCamera();

		Vec2 center2D = camera->getCenter2D();

		float zoom = camera->getZoom();

		Vec3 la = Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0.5f);
		Vec3 lb = Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0);
		Vec3 p1 = Vec3(-1, 1, 0);
		Vec3 p2 = Vec3(1, 1, 0);
		Vec3 p3 = Vec3(0, -1, 0);

		Vec3 intersection = linePlaneIntersection(la, lb, p1, p2, p3);

		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_documentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());

		Vec2 tilePos = tileLayer->getBottomLeftPos(Vec2(intersection.x, intersection.y));

		for (int i = 0; i < m_Size; i++) {
			for (int j = 0; j < m_Size; j++) {
				Vec2Int tilePos = tileLayer->getTilePos(pointerInfo.curr);

				setColor(tileLayer, tilePos);
			}
		}

		m_EventHandler->emitDataChange();
	}

	void BrushTool::setColor(TileLayer* tileLayer, Vec2Int tilePos)
	{
		unsigned int color = m_Services->getColorPalette()->color;

		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable == nullptr) {
			Vec2 worldPos = tileLayer->getBottomLeftPos(tileIndex);
			Rect2D* sprite = new Rect2D(worldPos.x, worldPos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
			tileLayer->add(sprite);
		}
		else {
			renderable->setColor(color);
		}
	}
}}
