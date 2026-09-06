package utils

func PreferedHttpScheme() string {
	if Env.MealFlowDev {
		return "http"
	}
	return "https"
}
