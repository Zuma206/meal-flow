package auth

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type exchangeRespBody struct {
	IdToken string `json:"id_token"`
}

func verifySubject(idToken string) (string, error) {
	claims := jwt.MapClaims{}
	if _, _, err := jwt.NewParser().ParseUnverified(idToken, claims); err != nil {
		return "", err
	}
	sub, err := claims.GetSubject()
	if err != nil {
		return "", err
	}
	verifiedAny, ok := claims["email_verified"]
	if !ok {
		return "", fmt.Errorf("missing subject: email_verified")
	}
	verified, ok := verifiedAny.(bool)
	if !(verified && ok) {
		return "", fmt.Errorf("invalid email_verified type or value")
	}
	return sub, nil
}

type exchangeCodeEnviron interface {
	getRedirectUriEnviron
	GetGoogleClientSecret() string
	GetGoogleClientId() string
}

func exchangeCode(environ exchangeCodeEnviron, code string) (string, error) {
	resp, err := http.PostForm("https://oauth2.googleapis.com/token", url.Values{
		"client_secret": []string{environ.GetGoogleClientSecret()},
		"client_id":     []string{environ.GetGoogleClientId()},
		"grant_type":    []string{"authorization_code"},
		"redirect_uri":  []string{getRedirectUri(environ)},
		"code":          []string{code},
	})
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	decoder := json.NewDecoder(resp.Body)
	body := &exchangeRespBody{}
	if err := decoder.Decode(body); err != nil {
		return "", err
	}
	return body.IdToken, nil
}

func callbackHandler(environ CallbackHandlerEnviron, w http.ResponseWriter, r *http.Request) error {
	recievedScope := r.URL.Query().Get("scope")
	code := r.URL.Query().Get("code")
	if recievedScope != expectedScope {
		return fmt.Errorf("invalid scope: %s", recievedScope)
	}
	if code == "" {
		return fmt.Errorf("missing code parameter")
	}
	idToken, err := exchangeCode(environ, code)
	if err != nil {
		return fmt.Errorf("code exchange failed: %w", err)
	}
	sub, err := verifySubject(idToken)
	if err != nil {
		return err
	}
	_, err = io.WriteString(w, sub)
	return err
}

type CallbackHandlerEnviron interface {
	exchangeCodeEnviron
}

func CallbackHandler(environ CallbackHandlerEnviron) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := callbackHandler(environ, w, r); err != nil {
			fmt.Fprintln(os.Stderr, r.URL.Path, "error:", err.Error())
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
	}
}
