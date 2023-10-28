#pragma once

#include "../engine/graphics/layer/tile_layer.h"
#include "algorithm/flip_horizontal.h"
#include "algorithm/rotate.h"
#include "algorithm/shear_horizontal.h"
#include "algorithm/shear_vertical.h"
#include "document/drawing.h"
#include "document/frame.h"
#include "editor.h"
#include "tool/tools/circle_tool/circle_tool.h"

#include <string>

using namespace spright::editor;

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <emscripten/val.h>

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
