create database student_details;
use student_details;

create table students(student_id int auto_increment primary key,
					 first_name varchar(50) not null,
                     last_name varchar(50) not null,
                     email varchar(50) unique not null,
                     contact_number varchar(15) not null,
                     address varchar(100) not null,
                     birth_date date not null,
                     gender enum("male","Female") not null,
                     city varchar(30) not null);
                     
ALTER TABLE students MODIFY contact_number VARCHAR(20);
truncate table students;
select * from students;
SELECT COUNT(DISTINCT city) FROM students;
SELECT DISTINCT city FROM students;

select * From students order by student_id desc;

create table student(student_id int auto_increment primary key,
					 first_name varchar(50) not null,
                     last_name varchar(50) not null,
                     email varchar(50) unique not null,
                     contact_number varchar(20) not null,
                     address varchar(100) not null,
                     birth_date date not null,
                     gender enum("male","Female") not null,
                     city varchar(30) not null);
                     
truncate table student;
truncate table students;
select birth_date from student;
select * from student;

SELECT * From student where ""  like "";