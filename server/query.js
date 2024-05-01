export const checkEmail = 'SELECT * FROM "user" WHERE "email" = $1'
export const addUser = 'INSERT INTO "user" (username, email, password, full_name) VALUES ($1, $2, $3, $4)'
export const addPost = "INSERT INTO posts (title, content, author_id, category_id, image, avatar, full_name, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
export const categoryList = "SELECT * FROM category"
export const allPosts = "SELECT * FROM posts";
export const getCategoryId = "SELECT * FROM category WHERE category_id = $1"
export const getUserId = 'SELECT * FROM "user" WHERE user_id = $1'
export const post = 'SELECT * FROM posts WHERE post_id = $1'