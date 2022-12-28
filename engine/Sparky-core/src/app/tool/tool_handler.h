#include <vector>
#include <iostream>
#include "tool.h"
#include "brush_tool.h"
#include "rectangle_tool.h"
#include "erase_tool.h"
#include "../service/services.h"
#include "../../engine/system/window/window.h"
#include "../../engine/system/window/input_listener.h"
#include "../editor_config.h"
#include "../service/services.h"
#include "../service/io/image_export.h"

namespace spright { namespace tool {

	using namespace std;
	using namespace ::engine::system;

	class ToolHandler : public InputListener {
	private:
		Window* m_Window;
		vector<Tool*> tools;
		vector<Tool*>* m_ActiveTools;
		Tool* m_SelectedTool;
		PointerInfo m_pointerInfo;
		EditorConfig m_EditorConfig;
		Services* m_Services;
		DocumentHandler* m_DocumentHandler;
		ImageExport* m_ImageExport;
	public:
		ToolHandler();
		ToolHandler(Window* window, DocumentHandler* documentHandler, EditorConfig& editorConfig, Services* services, ImageExport* m_ImageExport);
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

		Tool* getSelectedTool();
		void setSelectedTool(string name);

		inline void addActiveTool(string name) {
			m_ActiveTools->push_back(getTool(name));
		}

		inline void removeActiveTool(string name) {
			auto it = find(m_ActiveTools->begin(), m_ActiveTools->end(), getTool(name));

			if (it != m_ActiveTools->end()) {
				m_ActiveTools->erase(it);
			}
		}

		bool isActiveTool(string name);
	};
} }