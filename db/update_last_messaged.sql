update recents
set last messaged = $1
where userid = $2
and friendid = $3