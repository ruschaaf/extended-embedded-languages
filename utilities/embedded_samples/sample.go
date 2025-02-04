package main

import (
	"fmt"
	"os"
)

type User struct {
	Name string
}

func (u *User) Greet() {
	fmt.Printf("Hello, %s!\n", u.Name)
}

func main() {
	user := &User{Name: "World"}
	if len(os.Args) > 1 {
		user.Name = os.Args[1]
	}
	user.Greet()
}
