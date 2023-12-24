-- Câu 1: Lấy danh sách khóa học mà user có id = 1 đã mua
-- Yêu cầu: Trả về thông tin khóa học, tên và email của user
SELECT courses.*, users.name as username, users.email
FROM users
INNER JOIN users_courses
ON users.id = users_courses.user_id
INNER JOIN courses
ON courses.id = users_courses.course_id
INNER JOIN phones
ON phones.user_id = users.id
WHERE phones.phone = '0123456787';

