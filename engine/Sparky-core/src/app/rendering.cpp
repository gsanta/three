#include "rendering.h"

namespace spright {
	Rendering::Rendering(Window* window, DocumentHandler* documentHandler) : m_Window(window), m_DocumentHandler(documentHandler)
	{
		m_ImageRenderTarget = new ImageRenderTarget();
		m_DefaultRenderTarget = new DefaultRenderTarget();
		m_ActiveRenderTarget = m_DefaultRenderTarget;
	}

	Rendering::~Rendering()
	{
		delete m_ImageRenderTarget;
		delete m_DefaultRenderTarget;
	}

	void Rendering::render()
	{
		m_Window->beforeRender();
		if (m_DocumentHandler->hasActiveDocument()) {
			m_DocumentHandler->getActiveDocument()->render();
		}
		m_Window->afterRender();
	}

	void Rendering::enableImageTarget()
	{
		if (m_ActiveRenderTarget != m_ImageRenderTarget) {
			m_ActiveRenderTarget = m_ImageRenderTarget;
			m_DefaultRenderTarget->disable();
			m_ImageRenderTarget->enable();
		}
	}

	void Rendering::disableImageTarget()
	{
			m_ActiveRenderTarget = m_DefaultRenderTarget;
			m_ImageRenderTarget->disable();
		if (m_ActiveRenderTarget == m_ImageRenderTarget) {
			m_DefaultRenderTarget->enable();
		}
	}

	ImageRenderTarget* Rendering::getImageTarget()
	{
		return m_ImageRenderTarget;
	}
}