#pragma once
#include "layer.h"
#include "../../layout/container.h"

namespace spright { namespace engine {

	class ImageLayer : public Layer {

	public:
		ImageLayer(std::string name, std::string id, Container* container, Shader* shader, Renderer2D* renderer, Camera* camera);
	};

}}	