package auth

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"

	"github.com/zuma206/meal-flow/server/utils"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	recievedScope := r.URL.Query().Get("scope")
	code := r.URL.Query().Get("code")
	if recievedScope != expectedScope {
		http.Error(w, "invalid scope", http.StatusBadRequest)
		return
	}
	if code == "" {
		http.Error(w, "missing code", http.StatusBadRequest)
		return
	}
	resp, err := http.PostForm("https://oauth2.googleapis.com/token", url.Values{
		"client_secret": []string{utils.Env.GoogleClientSecret},
		"client_id":     []string{utils.Env.GoogleClientId},
		"grant_type":    []string{"authorization_code"},
		"redirect_uri":  []string{redirectUri},
		"code":          []string{code},
	})
	if err != nil {
		http.Error(w, "code exchange failed", http.StatusInternalServerError)
		fmt.Fprintln(os.Stderr, err.Error())
		return
	}
	defer resp.Body.Close()
	var buffer bytes.Buffer
	if _, err := io.Copy(&buffer, resp.Body); err != nil {
		http.Error(w, "failed to read code exchange response", http.StatusInternalServerError)
		return
	}
	fmt.Println(buffer.String())
}
