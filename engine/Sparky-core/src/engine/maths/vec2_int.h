

namespace spright_engine { namespace maths {

    class Vec2Int {
    public:
        int x;
        int y;

    public:
        Vec2Int();
        Vec2Int(int x, int y);

        Vec2Int operator+(const Vec2Int& right);
    };
 }}
