package pbModels

import (
	"coliving-crew.xyz/server/internal/constants"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/types"
)

var _ models.Model = (*User)(nil)

type User struct {
	models.BaseModel

	UserName  string         `db:"username" json:"username"`
	Email     string         `db:"email" json:"email"`
	Name      string         `db:"name" json:"name"`
	Avatar    string         `db:"avatar" json:"avatar"`
	BirthDate types.DateTime `db:"birthDate" json:"birthDate"`
	IsWoman   bool           `db:"isWoman" json:"isWoman"`
	Country   string         `db:"country" json:"country"`
}

func (m *User) TableName() string {
	return constants.USERS_COLLECTION
}

func (m *User) IsAuth() bool {
	return true
}
