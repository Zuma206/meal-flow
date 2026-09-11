package auth

import (
	"net/http"
	"net/url"

	"github.com/zuma206/meal-flow/server/utils"
)

const expectedScope = "email https://www.googleapis.com/auth/userinfo.email openid"

type getRedirectUriEnviron interface {
	utils.PreferedHttpSchemeEnviron
	MealFlowAddr() string
}

func getRedirectUri(environ getRedirectUriEnviron) string {
	return utils.PreferedHttpScheme(environ) + "://" + environ.MealFlowAddr() + "/auth/callback"
}

type RedirectHandlerEnviron interface {
	getRedirectUriEnviron
	GoogleClientId() string
}

func RedirectHandler(environ RedirectHandlerEnviron) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// https://accounts.google.com/o/oauth2/v2/auth
		url := &url.URL{
			Scheme: "https",
			Host:   "accounts.google.com",
			Path:   "/o/oauth2/v2/auth",
			RawQuery: url.Values{
				"client_id":     []string{environ.GoogleClientId()},
				"prompt":        []string{"select_account"},
				"redirect_uri":  []string{getRedirectUri(environ)},
				"response_type": []string{"code"},
				"scope":         []string{expectedScope},
			}.Encode(),
		}
		http.Redirect(w, r, url.String(), http.StatusFound)
	}
}
