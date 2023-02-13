#pragma once

#include "../engine/system/window/window.h"
#include "../engine/graphics/renderer/render_target.h"
#include "../engine/graphics/renderer/image_render_target.h"
#include "../engine/graphics/renderer/default_render_target.h"
#include "document/document_store.h"

namespace spright {
	using namespace ::spright::engine;
	using namespace ::spright::editor;

	class Rendering {
	private:
		Window *m_Window;
		DocumentStore* m_DocumentStore;
		RenderTarget* m_ActiveRenderTarget;
		ImageRenderTarget* m_ImageRenderTarget;
		RenderTarget* m_DefaultRenderTarget;

	public:
		Rendering(Window* window, DocumentStore* documentStore);
		~Rendering();

		void render();
		void enableImageTarget();
		void disableImageTarget();
		ImageRenderTarget* getImageTarget();
	};
}