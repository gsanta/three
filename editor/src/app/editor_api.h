#pragma once

#include "../engine/graphics/layer/tileLayer.h"
#include "algorithm/flip_horizontal.h"
#include "document/drawing.h"
#include "document/frame_impl.h"
#include "editor.h"
#include "tool/circle_tool/circle_tool.h"

#include <string>

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <emscripten/val.h>


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
void activateFramePlayer();
void deActivateFramePlayer();

void api_flip_horizontal();

#endif
