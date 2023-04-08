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
	const std::vector<FrameImpl>& frames = editor->getActiveDocument().getFrameStore().getFrames();

	std::vector<std::string> target;

	for (const Frame& frame : frames)
	{
		target.push_back(frame.getJson().dump());
	}

	return target;
}

void addFrame() {
	editor->getDocumentFactory()->createFrame(editor->getDocumentStore()->getActiveDocument());
}

void removeFrame(size_t index) {
	editor->getActiveDocument().getFrameStore().removeFrame(index);
}

void setActiveFrame(size_t index) {
	editor->getActiveDocument().getFrameStore().setActiveFrame(index);
}

std::string getActiveFrame() {
	return editor->getActiveFrame().getJson().dump();
}

void activateFramePlayer() {
	editor->getActiveDocument().getFramePlayer().setIsActive(true);
}

void deActivateFramePlayer() {
	editor->getActiveDocument().getFramePlayer().setIsActive(false);
}

EMSCRIPTEN_BINDINGS(spright) {
	emscripten::function("getFrames", &getFrames);
	emscripten::function("addFrame", &addFrame);
	emscripten::function("removeFrame", &removeFrame);
	emscripten::function("setActiveFrame", &setActiveFrame);
	emscripten::function("getActiveFrame", &getActiveFrame);
	emscripten::function("setLayerIndex", &setLayerIndex);
	emscripten::function("removeLayer", &removeLayer);
	emscripten::function("exportDocument", &exportDocument);
	emscripten::function("importDocument", &importDocument);
	emscripten::function("getToolData", &getToolData);
	emscripten::function("activateFramePlayer", &activateFramePlayer);
	emscripten::function("deActivateFramePlayer", &deActivateFramePlayer);
}

#endif
