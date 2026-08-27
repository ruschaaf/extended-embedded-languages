// This is a basic Java class
package com.example;

import java.util.List;

public class Greeter {
    private final String name;

    public Greeter(String name) {
        this.name = name;
    }

    public void greet(List<String> others) {
        for (String other : others) {
            System.out.println("Hello, " + other + "! I'm " + name);
        }
    }
}
