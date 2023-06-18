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
	//user
	s.router.Handle("/api/v1/user", tenter.NewFindAllUserHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/user/{id}", tenter.NewFindUserHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/user", tenter.NewUserHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/user", tenter.NewUpdateUserHandler()).Methods(http.MethodPut)
	s.router.Handle("/api/v1/user", tenter.NewFindUserHandler()).Methods(http.MethodDelete)

	//likes
	s.router.Handle("/api/v1/likes", tenter.NewFindUserHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/likes", tenter.NewFindUserHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/likes", tenter.NewFindUserHandler()).Methods(http.MethodDelete)

	//chats
	s.router.Handle("/api/v1/likes", tenter.NewFindUserHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/likes", tenter.NewFindUserHandler()).Methods(http.MethodDelete)

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
