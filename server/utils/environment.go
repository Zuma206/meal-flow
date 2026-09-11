package utils

import (
	"github.com/caarlos0/env/v11"
)

type Environ struct {
	GoogleClientSecret string `env:"GOOGLE_CLIENT_SECRET,required"`
	GoogleClientId     string `env:"GOOGLE_CLIENT_ID,required"`
	MealFlowAddr       string `env:"MEAL_FLOW_ADDR,required"`
	MealFlowDev        bool   `env:"MEAL_FLOW_DEV"`
}

func NewEnviron() (*Environ, error) {
	environ, err := env.ParseAs[Environ]()
	return &environ, err
}

func (env *Environ) GetGoogleClientSecret() string {
	return env.GoogleClientSecret
}

func (env *Environ) GetGoogleClientId() string {
	return env.GoogleClientId
}

func (env *Environ) GetMealFlowAddr() string {
	return env.MealFlowAddr
}

func (env *Environ) GetMealFlowDev() bool {
	return env.MealFlowDev
}
