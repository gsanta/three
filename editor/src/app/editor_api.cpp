#include "editor_api.h"

extern class Editor* editor;

#ifdef SPARKY_EMSCRIPTEN

void setLayerIndex(std::string layerId, int newIndex) {
	editor->getDocumentStore()->getActiveDocument()->getLayerHandler()->setLayerIndex(layerId, newIndex);
}

void removeLayer(std::string layerId) {
	editor->getDocumentStore()->getActiveDocument()->getLayerHandler()->removeLayer(layerId);
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

EMSCRIPTEN_BINDINGS(spright) {
	emscripten::function("setLayerIndex", &setLayerIndex);
	emscripten::function("removeLayer", &removeLayer);
	emscripten::function("exportDocument", &exportDocument);
	emscripten::function("importDocument", &importDocument);
	emscripten::function("getToolData", &getToolData);
}

#endif