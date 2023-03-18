#include "editor_api.h"

extern class Editor* editor;

#ifdef SPARKY_EMSCRIPTEN

void setLayerIndex(size_t oldIndex, size_t newIndex) {
	TileLayer& tileLayer = editor->getActiveFrame().getLayer(oldIndex);
	editor->getActiveFrame().insertLayer(std::move(tileLayer), newIndex);
}

void removeLayer(size_t layerIndex) {
	editor->getActiveFrame().removeLayer(layerIndex);
}

std::string exportDocument() {
	return editor->getJsonIO()->exportDocument(editor->getDocumentStore()->getActiveDocument());
}

void importDocument(std::string json) {
	return editor->getJsonIO()->importDocument(json);
}

std::string getToolData(std::string tool) {
	return editor->getToolHandler()->getTool(tool)->getData();
}

std::vector<std::string> getFrames()
{
	const std::vector<FrameImpl>& frames = editor->getActiveDocument()->getFrameStore().getFrames();

	std::vector<std::string> target;

	for (const Frame& frame : frames)
	{
		target.push_back(frame.getLayerDescription().dump());
	}

	return target;
}

EMSCRIPTEN_BINDINGS(spright) {
	emscripten::function("getFrames", &getFrames);
	emscripten::function("setLayerIndex", &setLayerIndex);
	emscripten::function("removeLayer", &removeLayer);
	emscripten::function("exportDocument", &exportDocument);
	emscripten::function("importDocument", &importDocument);
	emscripten::function("getToolData", &getToolData);
}

#endif
