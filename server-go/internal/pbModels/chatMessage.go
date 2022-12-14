package pbModels

import (
	"coliving-crew.xyz/server/internal/constants"
	"github.com/pocketbase/pocketbase/models"
)

var _ models.Model = (*ChatMessage)(nil)

type ChatMessage struct {
	models.BaseModel

	Chat    string `db:"chat" json:"chat"`     // *Chat
	Sender  string `db:"sender" json:"sender"` // *User
	Content string `db:"content" json:"content"`
}

func (m *ChatMessage) TableName() string {
	return constants.CHAT_MESSAGES_COLLECTION
}
