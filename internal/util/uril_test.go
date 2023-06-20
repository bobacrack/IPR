package util

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestWriteJsonWithStatus(t *testing.T) {
	// Create a mock HTTP response recorder
	recorder := httptest.NewRecorder()

	// Create a sample data to be written as JSON
	data := struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}{
		Name: "John Doe",
		Age:  25,
	}

	// Call the function under test
	WriteJsonWithStatus(recorder, data, http.StatusOK)

	// Check the response status code
	assert.Equal(t, http.StatusOK, recorder.Result().StatusCode)

	// Check the response body
	expectedBody, _ := json.Marshal(data)
	assert.Equal(t, expectedBody, recorder.Body.Bytes())
}

func TestVarValue(t *testing.T) {
	// Create a mock HTTP request
	req := httptest.NewRequest(http.MethodGet, "/users/123", nil)

	// Create a mock Gorilla mux router and add a route with a variable
	router := mux.NewRouter()
	router.HandleFunc("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		assert.Equal(t, "123", id)
	})

	// Serve the request using the router
	router.ServeHTTP(httptest.NewRecorder(), req)
}

func TestFromRequestBody(t *testing.T) {
	// Create a sample JSON payload
	payload := []byte(`{"name": "John Doe", "age": 25}`)

	// Create a mock HTTP request with the payload
	req := httptest.NewRequest(http.MethodPost, "/users", bytes.NewReader(payload))

	// Create a variable to hold the decoded JSON data
	var data struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}

	// Call the function under test
	err := FromRequestBody(req, &data)

	// Check for any errors during JSON decoding
	assert.NoError(t, err)

	// Check the decoded values
	assert.Equal(t, "John Doe", data.Name)
	assert.Equal(t, 25, data.Age)
}
