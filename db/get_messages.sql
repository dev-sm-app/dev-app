select id, messagepicture, message, authorpicture, userid, friendid, messagedate, code, mode from messages
where userid = $1
or friendid = $1
order by id