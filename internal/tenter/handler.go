package tenter

import (
	"ipr/util"
	"net/http"

	log "github.com/sirupsen/logrus"
)

type FindUserHandler struct {
	repository Repository
}

func NewFindUserHandler() FindUserHandler {
	return FindUserHandler{repository: GetRepository()}
}

func (h FindUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	user, err := h.repository.FindUsers()
	if err != nil {
		log.Errorf("ccannot find users: %v", err)
		return
	}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}
