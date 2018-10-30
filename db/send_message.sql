insert into messages (userid, friendid, authorpicture, message, messagepicture, date, type)
values ($1, $2, $3, $4, $5, $6)
returning *