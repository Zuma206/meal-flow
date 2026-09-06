package main

import (
	"fmt"
	"net/http"

	"github.com/zuma206/meal-flow/server/auth"
	"github.com/zuma206/meal-flow/server/utils"
)

func main() {
	http.HandleFunc("GET /auth/redirect", auth.RedirectHandler)
	http.HandleFunc("GET /auth/callback", auth.CallbackHandler)

	fmt.Println("Starting server at", utils.Env.MealFlowAddr)
	http.ListenAndServe(utils.Env.MealFlowAddr, nil)
}
