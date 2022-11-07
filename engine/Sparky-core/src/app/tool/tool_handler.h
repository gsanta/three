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
		Tool* m_ActiveTool;
		PointerInfo m_pointerInfo;
		EditorConfig m_EditorConfig;
	public:
		ToolHandler(spright_engine::system::Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig);
		virtual void onMouseUp(int button) override;
		virtual void onMouseDown(int button) override;
		virtual void onMouseMove(double x, double y) override;
		virtual void onScroll(double x, double y) override;

		void addTool(Tool* tool);

		Tool* getTool(string name) const;

		inline Tool* getActiveTool() const {
			return m_ActiveTool;
		}

		inline void setActiveTool(string name) {
			m_ActiveTool = getTool(name);
		}
	};
} }