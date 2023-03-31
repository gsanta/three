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

		std::vector<Drawing*>& drawings = m_documentStore->getActiveDocument()->getDrawings();

		for (Drawing* drawing : drawings) {
			if (drawing->getBounds().contains(pointerInfo.curr.x, pointerInfo.curr.y)) {
				TileLayer& tileLayer = drawing->getActiveLayer();

				for (int i = 0; i < m_Size; i++) {
					for (int j = 0; j < m_Size; j++) {
						Vec2Int tilePos = tileLayer.getTilePos(pointerInfo.curr);

						brush.paint(tileLayer, tilePos, getColor());
					}
				}
			}
		}
	}
}}
