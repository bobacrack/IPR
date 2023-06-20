package structs

import "time"

type Nutzer struct {
	ID        int    `gorm:"primaryKey" json:"id"`
	UID       string `gorm:"uid" json:"uid"`
	Firstname string `gorm:"firstname" json:"firstname"`
	Lastname  string `gorm:"lastname" json:"lastname"`
	Age       int    `gorm:"age" json:"age"`
	Agepref   int    `gorm:"agepref" json:"agepref"`
	Picture   string `gorm:"picture" json:"picture"`
}
type Chat struct {
	ID          int        `gorm:"primaryKey" json:"id"`
	UIDSender   int        `gorm:"uidsender" json:"uidsender"`
	UIDReceiver int        `gorm:"uidreceiver" json:"uidreceiver"`
	Message     string     `gorm:"message" json:"message"`
	Time        *time.Time `gorm:"time" json:"timestamp"`
}
type Like struct {
	ID       int
	UIDLiker int
	UIDLiked int
}
type Dislike struct {
	ID          int
	UIDDisliker int
	UIDDisliked int
}
