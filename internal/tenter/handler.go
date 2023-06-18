package tenter

import (
	"ipr/structs"
	"ipr/util"
	"net/http"

	log "github.com/sirupsen/logrus"
)

type FindAllUserHandler struct {
	repository Repository
}

func NewFindAllUserHandler() FindAllUserHandler {
	return FindAllUserHandler{repository: GetRepository()}
}

func (h FindAllUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	user, err := h.repository.FindUsers()
	if err != nil {
		log.Errorf("ccannot find users: %v", err)
		return
	}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}

type FindUserHandler struct {
	repository    Repository
	requestParser util.RequestParser
}

func NewFindUserHandler() FindUserHandler {
	return FindUserHandler{repository: GetRepository(), requestParser: util.NewRequestParser()}
}

func (h FindUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var id = h.requestParser.VarValue(r, "id")
	user, err := h.repository.FindUser(id)

	if err != nil {
		log.Errorf("cant find user: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}

type UserHandler struct {
	repository Repository
}

func NewUserHandler() UserHandler {
	return UserHandler{repository: GetRepository()}
}

func (h UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var user structs.Nutzer
	err := util.FromRequestBody(r, &user)
	log.Errorf("name: %s", user.Firstname)
	err = h.repository.NewUser(user)

	if err != nil {
		log.Errorf("cant add user: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}

type UpdateUserHandler struct {
	repository Repository
}

func NewUpdateUserHandler() UpdateUserHandler {
	return UpdateUserHandler{repository: GetRepository()}
}

func (h UpdateUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var user structs.Nutzer
	err := util.FromRequestBody(r, &user)
	err = h.repository.UpdateUser(user)

	if err != nil {
		log.Errorf("cant find user: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}
