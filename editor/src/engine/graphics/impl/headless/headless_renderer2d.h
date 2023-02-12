#pragma once

#include <cstddef>
#include "../../renderer/renderer2d.h"
#include "../../renderer/vertex_data.h"
#include "../../buffer/vertexArray.h"
#include "../../buffer/indexBuffer.h"
#include "../../renderable/renderable2d.h"

namespace spright { namespace engine {

	class HeadlessRenderer2D : public Renderer2D
	{
	private:
		VertexData* m_Buffer;
	public:
		void begin() override;
		void end() override;
		void flush() override;
		VertexData*& getBuffer() override;
	};
}}
