package db

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConnect(t *testing.T) {
	// Replace "<test-database-address>" with the address of your test database
	address := "postgresql://217.160.215.31:64000/tenter?sslmode=disable"

	// Call the Connect function
	Connect(address)

	// Assert that the database connection is not nil
	if database == nil {
		t.Errorf("Expected database connection, got nil")
	}
}

type mockLogger struct {
	logs []string
}

func (m *mockLogger) Log(message string) {
	m.logs = append(m.logs, message)
}

func TestCreateLogger(t *testing.T) {

	// Call the createLogger function
	result := createLogger()

	// Assert that the returned value is not nil
	assert.NotNil(t, result)

	// Perform additional assertions on the mock logger as needed
	// For example, you can check the log messages

}
