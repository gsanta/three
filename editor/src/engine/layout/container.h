#pragma once

#include "../graphics/layer/dimensions.h"

namespace spright { namespace engine {

	class Container {
	private:
		Dimensions m_Dimensions;

	public:
		Container(Dimensions dimensions);
		Dimensions& getDimensions();
	};
}}