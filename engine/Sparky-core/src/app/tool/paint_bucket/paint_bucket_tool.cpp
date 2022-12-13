#include "paint_bucket_tool.h"
#include "paint_bucket_tool.h"

namespace spright_app {
	
	PaintBucketTool::PaintBucketTool(document::DocumentHandler* documentHandler) : m_DocumentHandler(documentHandler), Tool("paint_bucket")
	{

	}

	void PaintBucketTool::pointerUp(tool::PointerInfo& pointerInfo)
	{
		Camera* camera = m_DocumentHandler->getActiveDocument()->getCamera();
		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getActiveLayer());
		spright_engine::maths::Vec2Int tilePos = tileLayer->getTilePos(camera->screenToModel(pointerInfo.curr));

		m_FloodFill.floodFill(tileLayer, tilePos.x, tilePos.y, 0xFFFF0000);
	}

}
