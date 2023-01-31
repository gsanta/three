#include "editor_api.h"

extern class Editor* editor;

#ifdef SPARKY_EMSCRIPTEN

void setLayerIndex(std::string layerId, int newIndex) {
	editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->setLayerIndex(layerId, newIndex);
}

void removeLayer(std::string layerId) {
	editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->removeLayer(layerId);
}

std::string exportDocument() {
	return editor->getJsonIO()->exportDocument(editor->getDocumentHandler()->getActiveDocument());
}

void importDocument(std::string json) {
	return editor->getJsonIO()->importDocument(editor->getDocumentHandler(), json);
}

EMSCRIPTEN_BINDINGS(spright) {
	emscripten::function("setLayerIndex", &setLayerIndex);
	emscripten::function("removeLayer", &removeLayer);
	emscripten::function("exportDocument", &exportDocument);
	emscripten::function("importDocument", &importDocument);
}

#endif