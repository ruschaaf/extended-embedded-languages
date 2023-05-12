# Makefile example
*.o : *.c
    gcc -c $< -o $@

program: main.o utils.o
    gcc $< -o program