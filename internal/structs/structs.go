package structs

type User struct {
	ID        int
	UID       int
	Firstname string
	Lastname  string
	Age       *time.Time
	AgePref   int
	Picture   string
}
type Chat struct {
	ID          int
	UIDSender   int
	UIDReceiver int
	Message     string
	Timestamp   *time.Time
}
type Like struct {
	ID       int
	UIDLiker int
	UIDLiked int
}
