#pragma once

#include <string>
#include "editor.h"
#include "../engine/graphics/layer/tileLayer.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>


using namespace spright::editor;

void setLayerIndex(std::string layerId, int newIndex);
void removeLayer(std::string layerId);
std::string exportDocument();
std::string getToolData(std::string tool);

#endif
