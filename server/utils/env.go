package utils

import (
	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

var Env struct {
	GoogleClientSecret string `env:"GOOGLE_CLIENT_SECRET,required"`
	GoogleClientId     string `env:"GOOGLE_CLIENT_ID,required"`
	MealFlowAddr       string `env:"MEAL_FLOW_ADDR,required"`
	MealFlowHost       string `env:"MEAL_FLOW_HOST,required"`
	MealFlowDev        bool   `env:"MEAL_FLOW_DEV"`
}

func init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	if err := env.Parse(&Env); err != nil {
		panic(err)
	}
}
