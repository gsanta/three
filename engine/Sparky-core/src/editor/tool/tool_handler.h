#include <vector>
#include <iostream>
#include "tool.h"
#include "brush_tool.h"
#include "rectangle_tool.h"
#include "erase_tool.h"
#include "../../graphics/window/window.h"
#include "../../graphics/window/input_listener.h"
#include "../editor_config.h"

using namespace my_app::graphics;

namespace my_app { namespace editor { namespace tool {

	using namespace std;

	class ToolHandler : InputListener {
	private:
		Window* m_Window;
		vector<Tool*> tools;
		Tool* m_ActiveTool;
		PointerInfo m_pointerInfo;
		EditorConfig m_EditorConfig;
	public:
		ToolHandler(Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig);
		virtual void onMouseUp(int button) override;
		virtual void onMouseDown(int button) override;
		virtual void onMouseMove(double x, double y) override;

		Tool* getTool(string name) const;

		inline Tool* getActiveTool() const {
			return m_ActiveTool;
		}

		inline void setActiveTool(string name) {
			m_ActiveTool = getTool(name);
		}
	};
} } }