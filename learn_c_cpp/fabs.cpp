#include <iostream>
#include <chrono>

void casting() {
    float a = 123.04;
    float a_n = (float)((int)a);
}

void bitwise() {
    float a = 123.04;
    int a_i = *(int*)&a;
    a_i &= 0x7FFFFFFF;
    float a_n = *(float*)&a_i;
}

int main(int argc, const char* argv[]) {

    for (int i = 0; i < 10; ++i) {
        auto casting_start = std::chrono::high_resolution_clock::now();
        casting();
        auto casting_end = std::chrono::high_resolution_clock::now();
        auto casting_duration = std::chrono::duration_cast<std::chrono::nanoseconds>(casting_end - casting_start).count();
        auto bitwise_start = std::chrono::high_resolution_clock::now();
        bitwise();
        auto bitwise_end = std::chrono::high_resolution_clock::now();
        auto bitwise_duration = std::chrono::duration_cast<std::chrono::nanoseconds>(bitwise_end - bitwise_start).count();

        std::cout << i << ". " "casting took " << casting_duration << " ns" << std::endl
                  << i << ". " "bitwise took " << bitwise_duration << " ns" << std::endl;
    }

    return 0;
}

