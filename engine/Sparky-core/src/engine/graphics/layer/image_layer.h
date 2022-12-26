#include "layer.h"

namespace spright { namespace engine {
	using namespace ::engine::graphics;

	class ImageLayer : public Layer {

	public:
		ImageLayer(std::string name, std::string id, Shader* shader, Renderer2D* renderer, Camera* camera, Dimensions dimensions);
	};

}}	