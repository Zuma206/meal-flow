package utils

import (
	"github.com/caarlos0/env/v11"
)

type environValues struct {
	GoogleClientSecret string `env:"GOOGLE_CLIENT_SECRET,required"`
	GoogleClientId     string `env:"GOOGLE_CLIENT_ID,required"`
	MealFlowAddr       string `env:"MEAL_FLOW_ADDR,required"`
	MealFlowDev        bool   `env:"MEAL_FLOW_DEV"`
}

type Environ struct {
	values environValues
}

func NewEnviron() (*Environ, error) {
	values, err := env.ParseAs[environValues]()
	return &Environ{values}, err
}

func (env *Environ) GoogleClientSecret() string {
	return env.values.GoogleClientSecret
}

func (env *Environ) GoogleClientId() string {
	return env.values.GoogleClientId
}

func (env *Environ) MealFlowAddr() string {
	return env.values.MealFlowAddr
}

func (env *Environ) MealFlowDev() bool {
	return env.values.MealFlowDev
}
