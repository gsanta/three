#pragma once

#include <cstddef>
#include <memory>
#include "../../renderer/renderer2d.h"
#include "../../renderer/vertex_data.h"
#include "../../buffer/vertexArray.h"
#include "../../buffer/indexBuffer.h"
#include "../../renderable/renderable2d.h"
#include "../../shader/shader.h"
#include "headless_shader.h"

namespace spright { namespace engine {

	class HeadlessRenderer2D : public Renderer2D
	{
	private:
		VertexData* m_Buffer;
		HeadlessShader m_Shader;
	public:
		void begin() override;
		void end() override;
		void flush() override;
		VertexData*& getBuffer() override;
		Shader& getShader() override;
	};
}}
