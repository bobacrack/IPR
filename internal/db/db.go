package db

import (
	"database/sql"
	"ipr/structs"
	"log"
	sdkLog "log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var database *gorm.DB
var sqlDatabase *sql.DB

func GetDB() *gorm.DB {
	return database
}

func Connect(address string) {
	var err error
	database, err = gorm.Open(postgres.Open(address), &gorm.Config{
		SkipDefaultTransaction: true,
		Logger:                 createLogger(),
	})

	sqlDatabase, err = database.DB()
	if err != nil {
		log.Panicf("cant open database: %s", err.Error())
	}
	sqlDatabase.SetMaxOpenConns(2)
}

func PostConnection() {
	migrate()
}

func migrate() {
	err := database.AutoMigrate(
		&structs.User{},
	)
	if err != nil {
		log.Panicf("cant migrate: %s", err.Error())
	}
}

func createLogger() logger.Interface {
	return logger.New(
		sdkLog.New(os.Stdout, "\r\n", sdkLog.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Warn,
		},
	)
}
