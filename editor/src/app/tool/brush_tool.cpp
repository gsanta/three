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

		Camera& camera = m_documentStore->getActiveDocument().getCamera();

		Vec2 center2D = camera.getCenter2D();

		float zoom = camera.getZoom();

		Drawing* drawing = m_documentStore->getActiveDocument().getDrawingAt(pointerInfo.curr);

		if (drawing != nullptr) {
			TileLayer& layer = drawing->getActiveLayer();

			for (int i = 0; i < m_Size; i++) {
				for (int j = 0; j < m_Size; j++) {
					Vec2Int tilePos = layer.getTilePos(pointerInfo.curr);

					brush.paint(layer, tilePos, getColor());
				}
			}
		}
	}
}}
