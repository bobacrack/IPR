package server

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewServer(t *testing.T) {
	port := 8080
	s := NewServer(port)

	assert.Equal(t, port, s.port)
	assert.NotNil(t, s.router)
}
