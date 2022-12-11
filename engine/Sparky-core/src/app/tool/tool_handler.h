#include <vector>
#include <iostream>
#include "tool.h"
#include "brush_tool.h"
#include "rectangle_tool.h"
#include "erase_tool.h"
#include "../../engine/system/window/window.h"
#include "../../engine/system/window/input_listener.h"
#include "../editor_config.h"


namespace spright_app { namespace tool {

	using namespace std;

	class ToolHandler : public spright_engine::system::InputListener {
	private:
		spright_engine::system::Window* m_Window;
		vector<Tool*> tools;
		vector<Tool*>* m_ActiveTools;
		PointerInfo m_pointerInfo;
		EditorConfig m_EditorConfig;
	public:
		ToolHandler();
		ToolHandler(spright_engine::system::Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig);
		~ToolHandler();

		ToolHandler& operator=(const ToolHandler& toolHandler);

		// TODO: destructor
		virtual void onMouseUp(bool buttons[3]) override;
		virtual void onMouseDown(bool buttons[3]) override;
		virtual void onMouseMove(double x, double y) override;
		virtual void onScroll(double x, double y) override;
		virtual void onKeyChange(int key, bool isPressed) override;

		void addTool(Tool* tool);

		Tool* getTool(string name) const;

		inline vector<Tool*>* getActiveTool() const {
			return m_ActiveTools;
		}

		inline void addActiveTool(string name) {
			m_ActiveTools->push_back(getTool(name));
		}

		inline void removeActiveTool(string name) {
			auto it = find(m_ActiveTools->begin(), m_ActiveTools->end(), getTool(name));

			if (it != m_ActiveTools->end()) {
				m_ActiveTools->erase(it);
			}
		}

		void clearActiveTools();
	};
} }