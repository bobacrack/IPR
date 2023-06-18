package main

import (
	"ipr/db"
	"ipr/server"
	"log"
	"net/url"
)

func main() {
	dbUrl, err := url.Parse("postgresql://217.160.215.31:64000/tenter?sslmode=disable")
	if err != nil {
		log.Panicf("cannot parse DB Connection")
	}
	dbUser := url.UserPassword("tenter", "tenter")
	dbUrl.User = dbUser
	db.Connect(dbUrl.String())

	server.NewServer(6969).Start()
}
