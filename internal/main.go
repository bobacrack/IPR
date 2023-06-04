package main

import (
	"ipr/ipr/internal/config"
	"ipr/ipr/internal/db"
	"ipr/ipr/internal/server"
)

func main() {
	config.Init()

	db.Connect(config.Config.DatabaseConnection)
	server.NewServer(config.Config.Port).Start()
}
