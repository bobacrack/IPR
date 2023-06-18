package tenter

import (
	"ipr/structs"
	"ipr/util"
	"net/http"
)

type FindUserHandler struct {
}

func NewFindUserHandler() FindUserHandler {
	return FindUserHandler{}
}

func (h FindUserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	user := structs.User{Firstname: "nils", Lastname: "kühl"}
	util.WriteJsonWithStatus(w, user, http.StatusOK)
}
