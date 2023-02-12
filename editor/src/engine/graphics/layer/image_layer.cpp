#include "image_layer.h"

namespace spright { namespace engine {

	ImageLayer::ImageLayer(std::string name, std::string id, Container* container, Shader* shader, Renderer2D* renderer, Camera* camera)
		: Layer(name, id, container, renderer, shader, camera) {



	}
}}