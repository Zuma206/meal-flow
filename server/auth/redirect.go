package auth

import (
	"net/http"
	"net/url"

	"github.com/zuma206/meal-flow/server/utils"
)

var redirectUri = utils.PreferedHttpScheme() + "://" + utils.Env.MealFlowHost + "/auth/callback"
var expectedScope = "email https://www.googleapis.com/auth/userinfo.email openid"

func RedirectHandler(w http.ResponseWriter, r *http.Request) {
	// https://accounts.google.com/o/oauth2/v2/auth
	url := &url.URL{
		Scheme: "https",
		Host:   "accounts.google.com",
		Path:   "/o/oauth2/v2/auth",
		RawQuery: url.Values{
			"client_id":     []string{utils.Env.GoogleClientId},
			"prompt":        []string{"select_account"},
			"redirect_uri":  []string{redirectUri},
			"response_type": []string{"code"},
			"scope":         []string{expectedScope},
		}.Encode(),
	}
	http.Redirect(w, r, url.String(), http.StatusFound)
}
