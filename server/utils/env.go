package utils

import (
	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

var Env struct {
	MealFlowAddr string `env:"MEAL_FLOW_ADDR,required"`
}

func init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	if err := env.Parse(&Env); err != nil {
		panic(err)
	}
}
