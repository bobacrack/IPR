package util

import (
	"encoding/json"
	"errors"
	"html"
	"io/ioutil"
	"net/http"
	"reflect"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

func WriteJsonWithStatus(w http.ResponseWriter, v interface{}, statusCode int) {
	bytes, _ := json.Marshal(v)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_, _ = w.Write(bytes)
}

type parser struct {
}

type RequestParser interface {
	VarValue(*http.Request, string) string
}

func NewRequestParser() RequestParser {
	return &parser{}
}

func (p *parser) VarValue(r *http.Request, key string) string {
	return mux.Vars(r)[key]
}

func FromRequestBody(r *http.Request, v interface{}) error {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Errorf("cannot read body: %s", err.Error())
		return errors.New(html.EscapeString(err.Error()))
	}

	err = json.Unmarshal(body, &v)
	if err != nil {
		resultType := reflect.TypeOf(v)
		log.Errorf("cannot unmarshal payload to type %v: %v --payload: %v", resultType, err.Error(), string(body))
		return errors.New("invalid json body: " + html.EscapeString(err.Error()))
	}
	return nil
}
