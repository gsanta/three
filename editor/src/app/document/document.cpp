#include "document.h"

namespace spright { namespace editor {

	Document::Document(Bounds bounds) : Container(bounds), m_ActiveDrawing(0)
	{
	}

	Document::~Document() {
		std::vector<Group<Rect2D>*>::iterator it;

		for (Drawing* drawing : m_Drawings) {
			delete drawing;
		}
	}

	FrameStore& Document::getFrameStore() {
		return m_Drawings[m_ActiveDrawing]->getFrameStore();
	}

	ActiveFrame& Document::getActiveFrame() {
		return getFrameStore().getActiveFrame();
	}


	TileLayer& Document::getActiveLayer() {
		return getFrameStore().getActiveFrame().getActiveLayer();
	}

	Drawing* Document::getActiveDrawing() {
		return m_Drawings[m_ActiveDrawing];
	}

	void Document::addDrawing(Drawing* drawing) {
		m_Drawings.push_back(drawing);
	}

	std::vector<Drawing*>& Document::getDrawings() {
		return m_Drawings;
	}

	std::string Document::getJson()
	{
		nlohmann::json json = getActiveLayer().getJson();

		return json.dump();
	}

	void Document::render()
	{
		for (Drawing* drawing : m_Drawings) {
			drawing->render();
		}
	}

	FramePlayer& Document::getFramePlayer() {
		return m_Drawings[m_ActiveDrawing]->getFramePlayer();
	}
}}
