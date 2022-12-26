#include "image_layer.h"

namespace spright { namespace engine {

	ImageLayer::ImageLayer(std::string name, std::string id, Shader* shader, Renderer2D* renderer, Camera* camera, Dimensions dimensions)
		: Layer(name, id, renderer, shader, camera, dimensions) {



	}
}}