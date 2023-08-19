#pragma once
#include "../cursor/cursor.h"
#include "document_info.h"
#include "pointer_info.h"
#include "tool_context.h"

#include <string>

namespace spright
{
namespace editor
{
    using namespace std;

    class Tool
    {
    public:
        Tool(string name, std::shared_ptr<Cursor> cursor = std::make_shared<Cursor>());

        void execPointerDown(const ToolContext &toolContext);

        void execPointerMove(const ToolContext &toolContext);

        void execPointerUp(const ToolContext &toolContext);

        void execDeactivate(const ToolContext &toolContext);

        inline virtual void pointerDown(const ToolContext &toolContext)
        {
        }
        inline virtual void pointerUp(const ToolContext &toolContext)
        {
        }

        inline virtual void pointerMove(const ToolContext &toolContext)
        {
        }

        inline virtual void scroll(const ToolContext &toolContext)
        {
        }

        inline virtual void activate()
        {
        }
        inline virtual void deactivate(const ToolContext &toolContext)
        {
        }
        inline virtual void setOptions(std::string json)
        {
        }
        inline virtual std::string getOptions()
        {
            return "{}";
        }
        inline virtual std::string getData()
        {
            return "";
        }
        inline string getName() const
        {
            return m_Name;
        }

    protected:
        std::shared_ptr<Cursor> getCursor() const;

        void setCursor(std::shared_ptr<Cursor> cursor);

    private:
        string m_Name;

        std::shared_ptr<Cursor> m_Cursor;
    };
} // namespace editor
} // namespace spright
