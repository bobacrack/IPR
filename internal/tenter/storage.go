package tenter

import (
	"ipr/db"
	"ipr/structs"

	"gorm.io/gorm"
)

var theRepo *repository

type repository struct {
	db *gorm.DB
}

type Repository interface {
	FindUsers() (nutzer []structs.Nutzer, err error)
	FindUser(id string) (nutzer structs.Nutzer, err error)
	NewUser(user structs.Nutzer) (err error)
	UpdateUser(user structs.Nutzer) (err error)
	DeleteUser(id int) (err error)
	FindLikes() (likes []structs.Like, err error)
	NewLike(like structs.Like) (err error)
	DeleteLike(like structs.Like) (err error)
	NewDislike(like structs.Dislike) (err error)
	NewChat(chat structs.Chat) (err error)
}

func GetRepository() Repository {
	if theRepo == nil {
		theRepo = &repository{db: db.GetDB()}
	}
	return theRepo
}

func (r *repository) FindUsers() (nutzer []structs.Nutzer, err error) {
	err = r.db.Find(&nutzer).Error
	return
}

func (r *repository) FindUser(id string) (nutzer structs.Nutzer, err error) {
	err = r.db.Table("nutzers").Where("id = ?", id).Find(&nutzer).Error
	return
}

func (r *repository) NewUser(user structs.Nutzer) (err error) {
	err = r.db.Table("nutzers").Save(&user).Error
	return
}

func (r *repository) UpdateUser(user structs.Nutzer) (err error) {
	err = r.db.Table("nutzers").Where("id = ?", user.ID).Updates(&user).Error
	return
}

func (r *repository) DeleteUser(id int) (err error) {
	err = r.db.Table("likes").Where("uidliker = ?", id).Delete(id).Error
	err = r.db.Table("likes").Where("uidliked = ?", id).Delete(id).Error
	err = r.db.Table("chat").Where("uidsender = ?", id).Delete(id).Error
	err = r.db.Table("chat").Where("uidreceiver = ?", id).Delete(id).Error
	err = r.db.Table("nutzers").Where("id = ?", id).Delete(id).Error
	return
}

func (r *repository) FindLikes() (likes []structs.Like, err error) {
	err = r.db.Table("likes").Find(&likes).Error
	return
}

func (r *repository) NewLike(like structs.Like) (err error) {
	err = r.db.Table("likes").Save(&like).Error
	return
}

func (r *repository) DeleteLike(like structs.Like) (err error) {
	err = r.db.Table("likes").Delete(&like).Error
	return
}

func (r *repository) NewDislike(like structs.Dislike) (err error) {
	err = r.db.Table("dislikes").Save(&like).Error
	return
}

func (r *repository) NewChat(chat structs.Chat) (err error) {
	err = r.db.Table("chat").Save(&chat).Error
	return
}