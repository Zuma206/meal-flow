package auth

import (
	"net/http"
	"net/url"

	"github.com/zuma206/meal-flow/server/utils"
)

var redirectUri = utils.PreferedHttpScheme() + "://" + utils.Env.MealFlowHost + "/auth/callback"
var scope = "openid"

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
			"scope":         []string{scope},
		}.Encode(),
	}
	http.Redirect(w, r, url.String(), http.StatusFound)
}
