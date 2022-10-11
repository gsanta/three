#include <vector>
#include <iostream>
#include "tool.h"
#include "brush_tool.h"
#include "rectangle_tool.h"
#include "erase_tool.h"
#include "../../engine/system/window/window.h"
#include "../../engine/system/window/input_listener.h"
#include "../editor_config.h"


namespace my_app { namespace editor { namespace tool {

	using namespace std;

	class ToolHandler : public my_app_engine::system::InputListener {
	private:
		my_app_engine::system::Window* m_Window;
		vector<Tool*> tools;
		Tool* m_ActiveTool;
		PointerInfo m_pointerInfo;
		EditorConfig m_EditorConfig;
	public:
		ToolHandler(my_app_engine::system::Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig);
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