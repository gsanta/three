#pragma once
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
    private:
        string name;

    public:
        Tool(string name);
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
            return this->name;
        }
    };
} // namespace editor
} // namespace spright
