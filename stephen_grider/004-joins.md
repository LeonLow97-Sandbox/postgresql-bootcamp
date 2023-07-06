# Relating Records with Joins

## Join with Different Tables

<img src="./pics/join1.png" />

```sql
SELECT contents, username
FROM COMMENTS
JOIN users ON users.id = comments.user_id;
```