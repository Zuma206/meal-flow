package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/zuma206/meal-flow/server/auth"
	"github.com/zuma206/meal-flow/server/utils"
)

type getServeMuxEnviron interface {
	auth.RedirectHandlerEnviron
	auth.CallbackHandlerEnviron
}

func getServeMux(environ getServeMuxEnviron) *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /auth/redirect", auth.RedirectHandler(environ))
	mux.HandleFunc("GET /auth/callback", auth.CallbackHandler(environ))
	return mux
}

func run() error {
	if err := godotenv.Load(); err != nil {
		return err
	}
	environment, err := utils.NewEnviron()
	if err != nil {
		return err
	}
	mux := getServeMux(environment)
	fmt.Println("Starting server at", "http://"+environment.GetMealFlowAddr())
	return http.ListenAndServe(environment.GetMealFlowAddr(), mux)
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintln(os.Stderr, "fatal error:", err.Error())
		os.Exit(1)
	}
}
