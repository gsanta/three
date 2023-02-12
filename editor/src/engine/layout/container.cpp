#include "./container.h"

namespace spright { namespace engine {

	Container::Container(Dimensions dimensions): m_Dimensions(dimensions) {

	}

	Dimensions& Container::getDimensions() {
		return m_Dimensions;
	}
}}