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
