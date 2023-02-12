#pragma once

#include <string>
#include "editor.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>


using namespace spright::editor;

void setLayerIndex(std::string layerId, int newIndex);
void removeLayer(std::string layerId);
std::string exportDocument();

#endif
