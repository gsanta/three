#pragma once
#include "../graphics/renderable/bounds.h"

namespace spright { namespace engine {

	class Container {
	private:
		Bounds m_Bounds;

	public:
		Container(Bounds bounds);
		Bounds& getDimensions();
	};
}}