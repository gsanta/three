#pragma once

#include "../src/editing/utils/run_loop/timed.h"

using namespace spright::editing;

class TimedMock : public Timed
{
public:
    int id;

public:
    inline TimedMock(int id) : id(id)
    {
    }
    inline void update(int elapsed) override{

    };
};
