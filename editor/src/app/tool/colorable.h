

namespace spright
{
namespace editor
{

    class Colorable
    {
    private:
        unsigned int m_Color = 0xFF266CCE;

    public:
        unsigned int getColor() const;
        void setColor(unsigned int color);
    };
} // namespace editor
} // namespace spright