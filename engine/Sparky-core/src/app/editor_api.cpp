#include "editor_api.h"

extern class Editor* editor;

#ifdef SPARKY_EMSCRIPTEN

void setLayerIndex(std::string layerId, int newIndex) {
	editor->getDocumentHandler()->getActiveDocument()->setLayerIndex(layerId, newIndex);
}

void removeLayer(std::string layerId) {
	editor->getDocumentHandler()->getActiveDocument()->removeLayer(layerId);
}

EMSCRIPTEN_BINDINGS(spright) {
	emscripten::function("setLayerIndex", &setLayerIndex);
	emscripten::function("removeLayer", &removeLayer);
}

#endif