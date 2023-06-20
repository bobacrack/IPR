package tenter

import (
	"encoding/json"
	"ipr/structs"
	"ipr/util"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestFindUsers(t *testing.T) {
	repo := mockedRepo{}
	repo.users = []structs.Nutzer{
		{ID: 1, UID: "abc", Firstname: "a", Lastname: "b", Age: 12, Agepref: 12, Picture: "pic"},
	}

	handler := FindAllUserHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/v1/user", nil)

	handler.ServeHTTP(response, request)

	var nutzer []structs.Nutzer
	_ = json.Unmarshal(response.Body.Bytes(), &nutzer)
	assert.Len(t, nutzer, 1)

}

func TestDeleteUser(t *testing.T) {
	repo := mockedRepo{}
	repo.users = []structs.Nutzer{
		{ID: 1, UID: "abc", Firstname: "a", Lastname: "b", Age: 12, Agepref: 12, Picture: "pic"},
	}
	handler := DeleteUserHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodDelete, "/api/v1/user", nil)
	handler.ServeHTTP(response, request)

	var nutzer []structs.Nutzer
	_ = json.Unmarshal(response.Body.Bytes(), &nutzer)
	assert.Len(t, nutzer, 0)
}

func TestFindSpecificUser(t *testing.T) {
	repo := mockedRepo{}
	repo.users = []structs.Nutzer{
		{ID: 1, UID: "abc", Firstname: "a", Lastname: "b", Age: 12, Agepref: 12, Picture: "pic"},
	}
	handler := FindUserHandler{repository: &repo, requestParser: util.NewRequestParser()}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodDelete, "/api/v1/user/1", nil)
	handler.ServeHTTP(response, request)
	var nutzer structs.Nutzer
	_ = json.Unmarshal(response.Body.Bytes(), &nutzer)
	assert.Equal(t, 0, nutzer.ID)
}

func TestAddUser(t *testing.T) {
	repo := mockedRepo{}
	repo.users = []structs.Nutzer{
		{ID: 1, UID: "abc", Firstname: "a", Lastname: "b", Age: 12, Agepref: 12, Picture: "pic"},
	}
	handler := UserHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/api/v1/user", nil)
	handler.ServeHTTP(response, request)
	var nutzer []structs.Nutzer
	_ = json.Unmarshal(response.Body.Bytes(), &nutzer)
	assert.Len(t, repo.users, 2)
}

func TestUpdateUser(t *testing.T) {
	repo := mockedRepo{}
	repo.users = []structs.Nutzer{
		{ID: 1, UID: "abc", Firstname: "a", Lastname: "b", Age: 12, Agepref: 12, Picture: "pic"},
	}
	handler := UpdateUserHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPut, "/api/v1/user", nil)
	handler.ServeHTTP(response, request)
	var nutzer []structs.Nutzer
	_ = json.Unmarshal(response.Body.Bytes(), &nutzer)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestFindLikes(t *testing.T) {
	repo := mockedRepo{}
	repo.likes = []structs.Like{
		{ID: 1, UIDLiker: 1, UIDLiked: 2},
		{ID: 2, UIDLiker: 2, UIDLiked: 1},
	}
	handler := FindLikesHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPut, "/api/v1/like", nil)
	handler.ServeHTTP(response, request)
	var likes []structs.Like
	_ = json.Unmarshal(response.Body.Bytes(), &likes)
	assert.Len(t, likes, 2)
}

func TestNewLike(t *testing.T) {
	repo := mockedRepo{}
	repo.likes = []structs.Like{
		{ID: 1, UIDLiker: 1, UIDLiked: 2},
		{ID: 2, UIDLiker: 2, UIDLiked: 1},
	}
	handler := LikeHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/api/v1/like", nil)
	handler.ServeHTTP(response, request)
	var likes []structs.Like
	_ = json.Unmarshal(response.Body.Bytes(), &likes)
	assert.Len(t, repo.likes, 3)
}

func TestDeleteLike(t *testing.T) {
	repo := mockedRepo{}
	repo.likes = []structs.Like{
		{ID: 1, UIDLiker: 1, UIDLiked: 2},
		{ID: 2, UIDLiker: 2, UIDLiked: 1},
	}
	handler := DeleteLikeHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodDelete, "/api/v1/like", nil)
	handler.ServeHTTP(response, request)
	var likes []structs.Like
	_ = json.Unmarshal(response.Body.Bytes(), &likes)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestNewDislike(t *testing.T) {
	repo := mockedRepo{}
	repo.dislikes = []structs.Dislike{
		{ID: 1, UIDDisliker: 1, UIDDisliked: 2},
		{ID: 2, UIDDisliker: 2, UIDDisliked: 1},
	}
	handler := DislikeHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/api/v1/dislike", nil)
	handler.ServeHTTP(response, request)
	var likes []structs.Dislike
	_ = json.Unmarshal(response.Body.Bytes(), &likes)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestGetChat(t *testing.T) {
	repo := mockedRepo{}
	var tNoew = time.Now()
	repo.chats = []structs.Chat{
		{ID: 1, UIDSender: 1, UIDReceiver: 2, Message: "m", Time: &tNoew},
	}
	handler := GetChatHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/v1/chat", nil)
	handler.ServeHTTP(response, request)
	var chats []structs.Chat
	_ = json.Unmarshal(response.Body.Bytes(), &chats)
	assert.Len(t, chats, 1)
}

func TestNewChat(t *testing.T) {
	repo := mockedRepo{}
	var tNoew = time.Now()
	repo.chats = []structs.Chat{
		{ID: 1, UIDSender: 1, UIDReceiver: 2, Message: "m", Time: &tNoew},
	}
	handler := ChatHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/api/v1/chat", nil)
	handler.ServeHTTP(response, request)
	var chats []structs.Chat
	_ = json.Unmarshal(response.Body.Bytes(), &chats)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestDeleteChat(t *testing.T) {
	repo := mockedRepo{}
	var tNoew = time.Now()
	repo.chats = []structs.Chat{
		{ID: 1, UIDSender: 1, UIDReceiver: 2, Message: "m", Time: &tNoew},
	}
	handler := DeleteChatHandler{repository: &repo}
	response := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodDelete, "/api/v1/chat", nil)
	handler.ServeHTTP(response, request)
	var chats []structs.Chat
	_ = json.Unmarshal(response.Body.Bytes(), &chats)
	assert.Len(t, chats, 0)
}

type mockedRepo struct {
	errorState bool
	users      []structs.Nutzer
	likes      []structs.Like
	chats      []structs.Chat
	dislikes   []structs.Dislike
}

func (m *mockedRepo) FindUsers() (nutzer []structs.Nutzer, err error) {
	return m.users, nil
}

func (m *mockedRepo) FindUser(id string) (nutzer structs.Nutzer, err error) {
	mid, err := strconv.Atoi(id)
	var nutzerdw = structs.Nutzer{ID: mid, Firstname: "a"}
	m.users = append(m.users, nutzerdw)
	for _, v := range m.users {
		mid, err := strconv.Atoi(id)
		if v.ID == mid {
			return v, err
		}
	}
	return structs.Nutzer{}, nil
}

func (m *mockedRepo) NewUser(user structs.Nutzer) (err error) {
	m.users = append(m.users, user)
	print("leng" + strconv.Itoa(len(m.users)))
	return nil
}

func (m *mockedRepo) UpdateUser(user structs.Nutzer) (err error) {
	return nil
}

func (m *mockedRepo) DeleteUser(id int) (err error) {
	m.users = append(m.users[:0], m.users[1:]...)
	return nil
}
func (m *mockedRepo) FindLikes() (likes []structs.Like, err error) {
	return m.likes, nil
}

func (m *mockedRepo) NewLike(like structs.Like) (err error) {
	m.likes = append(m.likes, like)
	return nil
}

func (m *mockedRepo) DeleteLike(like structs.Like) (err error) {
	m.likes = append(m.likes[:0], m.likes[1:]...)
	return nil
}

func (m *mockedRepo) NewDislike(like structs.Dislike) (err error) {
	m.dislikes = append(m.dislikes, like)
	return nil
}

func (m *mockedRepo) NewChat(chat structs.Chat) (err error) {
	m.chats = append(m.chats, chat)
	return nil
}

func (m *mockedRepo) DeleteRequest(chat structs.Chat) (err error) {
	m.chats = append(m.chats[:0], m.chats[1:]...)
	return nil
}

func (m *mockedRepo) GetChats() (chats []structs.Chat, err error) {
	return m.chats, nil
}
