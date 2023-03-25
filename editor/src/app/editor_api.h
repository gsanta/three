#pragma once

#include <string>
#include "editor.h"
#include "document/frame_impl.h"
#include "../engine/graphics/layer/tileLayer.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>


using namespace spright::editor;

void setLayerIndex(size_t oldIndex, size_t newIndex);
void removeLayer(size_t layerIndex);
std::string exportDocument();
std::string getToolData(std::string tool);
std::vector<std::string> getFrames();
void addFrame();
void removeFrame(size_t index);
void setActiveFrame(size_t index);
std::string getActiveFrame();

#endif
