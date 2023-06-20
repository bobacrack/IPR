package structs

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
	ID          int
	UIDSender   int
	UIDReceiver int
	Message     string
	Timestamp   int
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
