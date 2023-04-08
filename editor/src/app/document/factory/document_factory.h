#pragma once
#include <vector>
#include "renderer_provider.h"
#include "../checkerboard.h"
#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/layer/group.h"
#include "../../../engine/graphics/shader/shader.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"
#include "../../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../../engine/graphics/renderable/line_shape.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../engine/layout/container.h"
#include "../../../engine/system/window/window.h"
#include "./../document.h"
#include "./../drawing.h"
#include "./../frame.h"
#include "./../frame_impl.h"
#include "../../event/event_emitter.h"

namespace spright { namespace editor {
	using namespace std;
	using namespace ::spright::engine;

	class DocumentFactory {
	private:
		Container* m_WindowContainer;
		EventEmitter* m_EventEmitter;
		Checkerboard m_Checkerboard;
		RendererProvider* m_RendererProvider = nullptr;
	public:
		DocumentFactory(Container* windowContainer, RendererProvider* rendererProvider, EventEmitter* eventEmitter);
		DocumentFactory(const DocumentFactory&);
		~DocumentFactory();
		Document createDocument();
		Drawing createDrawing(Bounds bounds, bool checkerboard = true, float zPos = 0);
		void createFrame(Document& document);
		void createUserLayer(Drawing& drawing, std::string name);
	};
}}
