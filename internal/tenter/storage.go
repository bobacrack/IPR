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
