package server

import (
	"fmt"
	"net/http"
	"time"

	"ipr/tenter"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

type Server struct {
	port   int
	router *mux.Router
}

func NewServer(port int) Server {
	return Server{port: port, router: mux.NewRouter()}
}

func (s Server) Start() {
	// Enable CORS
	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"}) // Update with your allowed origins

	// Apply CORS middleware
	corsHandler := handlers.CORS(headers, methods, origins)(s.router)

	//user
	s.router.Handle("/api/v1/user", tenter.NewFindAllUserHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/user/{id}", tenter.NewFindUserHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/user", tenter.NewUserHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/user", tenter.NewUpdateUserHandler()).Methods(http.MethodPut)
	s.router.Handle("/api/v1/user/{id}", tenter.NewDeleteUserHandler()).Methods(http.MethodDelete)

	//likes
	s.router.Handle("/api/v1/likes", tenter.NewFindLikesHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/likes", tenter.NewLikeHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/likes", tenter.NewDeleteLikeHandler()).Methods(http.MethodDelete)
	s.router.Handle("/api/v1/dislike", tenter.NewDislikeHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/dislike", tenter.NewGetDislikesHandler()).Methods(http.MethodGet)

	//chats
	s.router.Handle("/api/v1/chat", tenter.NewGetChatHandler()).Methods(http.MethodGet)
	s.router.Handle("/api/v1/chat", tenter.NewChatHandler()).Methods(http.MethodPost)
	s.router.Handle("/api/v1/likes", tenter.NewDeleteChatHandler()).Methods(http.MethodDelete)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", s.port),
		Handler:      corsHandler,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Infof("Server started on addr: %v", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
