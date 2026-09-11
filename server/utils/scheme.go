package utils

type PreferedHttpSchemeEnviron interface {
	MealFlowDev() bool
}

func PreferedHttpScheme(environment PreferedHttpSchemeEnviron) string {
	if environment.MealFlowDev() {
		return "http"
	}
	return "https"
}
