#include "./container.h"

namespace spright { namespace engine {

	Container::Container(Bounds bounds): m_Bounds(bounds) {

	}

	const Bounds& Container::getBounds() const {
		return m_Bounds;
	}
}}