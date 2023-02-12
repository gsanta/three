#pragma once

#include "../engine/system/window/window.h"
#include "document/document_handler.h"
#include "../engine/graphics/renderer/render_target.h"
#include "../engine/graphics/renderer/image_render_target.h"
#include "../engine/graphics/renderer/default_render_target.h"

namespace spright {
	using namespace ::spright::engine;
	using namespace ::spright::editor;

	class Rendering {
	private:
		Window *m_Window;
		DocumentHandler* m_DocumentHandler;
		RenderTarget* m_ActiveRenderTarget;
		ImageRenderTarget* m_ImageRenderTarget;
		RenderTarget* m_DefaultRenderTarget;

	public:
		Rendering(Window* window, DocumentHandler* m_DocumentHandler);
		~Rendering();

		void render();
		void enableImageTarget();
		void disableImageTarget();
		ImageRenderTarget* getImageTarget();
	};
}