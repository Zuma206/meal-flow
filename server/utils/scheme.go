package utils

type PreferedHttpSchemeEnvironment interface {
	GetMealFlowDev() bool
}

func PreferedHttpScheme(environment PreferedHttpSchemeEnvironment) string {
	if environment.GetMealFlowDev() {
		return "http"
	}
	return "https"
}
