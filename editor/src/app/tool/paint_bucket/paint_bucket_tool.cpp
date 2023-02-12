#include "paint_bucket_tool.h"
#include "paint_bucket_tool.h"

namespace spright { namespace editor {

	PaintBucketTool::PaintBucketTool(DocumentHandler* documentHandler, Services* services) : m_DocumentHandler(documentHandler), m_Services(services), Tool("paint_bucket")
	{
	}

	void PaintBucketTool::pointerUp(PointerInfo& pointerInfo)
	{
		Camera* camera = m_DocumentHandler->getActiveDocument()->getCamera();
		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());
		Vec2Int tilePos = tileLayer->getTilePos(pointerInfo.curr);

		m_FloodFill.floodFill(tileLayer, tilePos.x, tilePos.y, m_Services->getColorPalette()->color);
	}
}}
