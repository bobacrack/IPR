package tenter

import (
	"ipr/structs"
	"ipr/util"
	"net/http"

	log "github.com/sirupsen/logrus"
)

type DeleteUserHandler struct {
	repository Repository
}

func NewDeleteUserHandler() DeleteUserHandler {
	return DeleteUserHandler{repository: GetRepository()}
}

func (h DeleteUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var user structs.Nutzer
	userID := util.FromRequestBody(r, &user)
	log.Errorf("id : %s", userID)
	err := h.repository.DeleteUser(user.ID)
	if err != nil {
		log.Errorf("cannot delete user: %v", err)
		return
	}
	w.WriteHeader(http.StatusOK)
}

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

type FindLikesHandler struct {
	repository Repository
}

func NewFindLikesHandler() FindLikesHandler {
	return FindLikesHandler{repository: GetRepository()}
}

func (h FindLikesHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	likes, err := h.repository.FindLikes()
	if err != nil {
		log.Errorf("ccannot find likes: %v", err)
		return
	}
	util.WriteJsonWithStatus(w, likes, http.StatusOK)
}

type LikeHandler struct {
	repository Repository
}

func NewLikeHandler() LikeHandler {
	return LikeHandler{repository: GetRepository()}
}

func (h LikeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var like structs.Like
	err := util.FromRequestBody(r, &like)
	err = h.repository.NewLike(like)

	if err != nil {
		log.Errorf("cant add like: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, like, http.StatusOK)

}

type DeleteLikeHandler struct {
	repository Repository
}

func NewDeleteLikeHandler() DeleteLikeHandler {
	return DeleteLikeHandler{repository: GetRepository()}
}

func (h DeleteLikeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var like structs.Like
	err := util.FromRequestBody(r, &like)
	err = h.repository.DeleteLike(like)
	if err != nil {
		log.Errorf("cant delete like: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, like, http.StatusOK)
}

type DislikeHandler struct {
	repository Repository
}

func NewDislikeHandler() DislikeHandler {
	return DislikeHandler{repository: GetRepository()}
}

func (h DislikeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var like structs.Dislike
	err := util.FromRequestBody(r, &like)
	err = h.repository.NewDislike(like)
	if err != nil {
		log.Errorf("cant delete like: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, like, http.StatusOK)
}

type ChatHandler struct {
	repository Repository
}

func NewChatHandler() ChatHandler {
	return ChatHandler{repository: GetRepository()}
}

func (h ChatHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var chat structs.Chat
	err := util.FromRequestBody(r, &chat)
	err = h.repository.NewChat(chat)
	if err != nil {
		log.Errorf("cant add chat: %v", err.Error())
		return
	}
	util.WriteJsonWithStatus(w, chat, http.StatusOK)
}