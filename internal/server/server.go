package server

import (
	"fmt"
	"net/http"
	"time"

	"ipr/tenter"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/http2"
)

type Server struct {
	port   int
	router *mux.Router
}

func NewServer(port int) Server {
	return Server{port: port, router: mux.NewRouter()}
}

func (s Server) Start() {
	s.router.Handle("/api/v1/user", tenter.NewFindUserHandler()).Methods(http.MethodGet)

	srv := http.Server{
		WriteTimeout: 4 * time.Minute,
		ReadTimeout:  30 * time.Second,
		Addr:         fmt.Sprintf(":%d", s.port),
		Handler:      s.router,
	}

	err := http2.ConfigureServer(&srv, &http2.Server{})
	if err != nil {
		log.Error(err.Error())
	}

	log.Infof("Server started on addr: %v", srv.Addr)
	log.Fatal(srv.ListenAndServe())

}
