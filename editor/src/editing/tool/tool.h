#pragma once
#include "context/document_info.h"
#include "context/pointer_info.h"
#include "context/tool_context.h"
#include "cursor/cursor.h"

#include <string>

namespace spright
{
namespace editing
{
    using namespace std;

    // template <typename C>
    class Tool
    {
    public:
        Tool(string name, std::shared_ptr<Cursor> cursor = std::make_shared<Cursor>());

        void execPointerDown(ToolContext &toolContext);

        void execPointerMove(ToolContext &toolContext);

        void execPointerUp(ToolContext &toolContext);

        void execDeactivate(ToolContext &toolContext);

        virtual void execActivate(Canvas *canvas) = 0;

        inline virtual void pointerDown(const ToolContext &toolContext)
        {
        }

        inline virtual void pointerUp(ToolContext &toolContext)
        {
        }

        inline virtual void pointerMove(const ToolContext &toolContext)
        {
        }

        inline virtual void scroll(const ToolContext &toolContext)
        {
        }

        inline virtual void execute(const ToolContext &toolContext)
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
} // namespace editing
} // namespace spright
