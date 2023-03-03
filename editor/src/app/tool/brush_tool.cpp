#include "brush_tool.h"

namespace spright { namespace editor {

	BrushTool::BrushTool(DocumentStore *documentStore)
			: m_documentStore(documentStore), Tool("brush")
	{
	}

	void BrushTool::setSize(int size)
	{
		m_Size = size;
	}

	void BrushTool::pointerMove(PointerInfo &pointerInfo)
	{
		paint(pointerInfo);
	}

	void BrushTool::pointerDown(PointerInfo& pointerInfo)
	{
		paint(pointerInfo);
	}

	void BrushTool::paint(PointerInfo& pointerInfo) {
		if (pointerInfo.isLeftButtonDown() == false) {
			return;
		}

		Camera* camera = m_documentStore->getActiveDocument()->getCamera();

		Vec2 center2D = camera->getCenter2D();

		float zoom = camera->getZoom();

		Vec3 la = Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0.5f);
		Vec3 lb = Vec3(center2D.x * zoom + pointerInfo.curr.x, center2D.y * zoom + pointerInfo.curr.y, 0);
		Vec3 p1 = Vec3(-1, 1, 0);
		Vec3 p2 = Vec3(1, 1, 0);
		Vec3 p3 = Vec3(0, -1, 0);

		Vec3 intersection = linePlaneIntersection(la, lb, p1, p2, p3);

		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_documentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());

		for (int i = 0; i < m_Size; i++) {
			for (int j = 0; j < m_Size; j++) {
				Vec2Int tilePos = tileLayer->getTilePos(pointerInfo.curr);

				brush.paint(tileLayer, tilePos, getColor());
			}
		}
	}
}}
