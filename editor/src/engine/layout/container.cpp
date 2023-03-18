#include "./container.h"

namespace spright { namespace engine {

	Container::Container(Bounds bounds): m_Bounds(bounds) {

	}

	Bounds& Container::getDimensions() {
		return m_Bounds;
	}
}}