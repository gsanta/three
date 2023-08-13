#pragma once

#include "../src/app/core/run_loop/timed.h"

using namespace spright::editor;

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
