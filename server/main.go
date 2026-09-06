package main

import (
	"fmt"
	"net/http"

	"github.com/zuma206/meal-flow/server/utils"
)

func main() {
	fmt.Println("Starting server at", utils.Env.MealFlowAddr)
	http.ListenAndServe(utils.Env.MealFlowAddr, nil)
}
