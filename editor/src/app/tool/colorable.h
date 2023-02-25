

namespace spright { namespace editor {

	class Colorable {
	private:
		unsigned int m_Color = 0x8f000000;
	public:
		unsigned int getColor() const;
		void setColor(unsigned int color);
	};
}}