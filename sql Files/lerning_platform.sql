create database lerning_platform;
use lerning_platform;

create table users(user_id bigint primary key auto_increment,
                 first_name varchar(150) not null,
                 email varchar(150) unique not null,
                 password_hash varchar(150) not null,
                 role enum('Student','Instructor'),
                 created_at timestamp default current_timestamp);
 
 create table courses(course_id bigint primary key auto_increment,
                     title varchar(150) not null,
                     description text,
                     instructor_id bigint not null,
                     course_type enum('Free','Paid') not null,
                     course_price decimal(5,2),
                     duration_hours int not null,
                     passing_percentage int not null,
                     foreign key(instructor_id) references users(user_id));
                 
create table payments(payment_id bigint primary key auto_increment,
					course_id bigint not null,
                    student_id bigint not null,
                    amount decimal(5,3),
                    payment_status enum('Pending','Complete','Failed') not null,
                    payment_log timestamp default current_timestamp,
                    foreign key(course_id) references courses(course_id),
                    foreign key(student_id) references users(student_id));
                    
create table enrollments(enrollment_id bigint primary key auto_increment,
						course_id bigint not null,
                        stuident_id bigint not null,
                       enrolled_type enum('Free', 'Paid') not null,
                        status enum('In_progress','Complete','Enrolled') not null,
                        enrolled_at timestamp default current_timestamp,
                        foreign key(course_id) references courses(course_id),
                        foreign key(student_id) references users(user_id));				
                        
create table course_lessons(course_lesson_id bigint primary key auto_increment,
                           total_lesson int not null,
                           course_id bigint not null,
                           title varchar(150),
                           foreign key(course_id) references courses(course_id));
                           
create table lesson_content(lesson_id bigint primary key auto_increment,
                            lesson_description varchar(150),
                            content_type enum('Text','Video','Audio') Not Null,
                            course_lesson_id bigint not null,
                            foreign key(course_lesson_id) references course_lessons(course_lesson_id));

create table lesson_progress(progres_id bigint primary key auto_increment,
                             enrollment_id bigint not null,
                             course_lesson_id bigint not null,
                             first_acessed datetime,
                             completed_at datetime,
                             lesson_status enum('IN_progress','Completed','Enrolled'),
                             foreign key(enrollment_id) references enrollments(enrollment_id),
                            foreign key(course_lesson_id) references course_lessons(course_lesson_id));
                            
create table exam(exam_id bigint primary key auto_increment,
                  couse_id bigint not null,
                  total_question int not null,
				  foreign key(course_id) references courses(course_id));
                  
create table exam_questions(question_id bigint primary key auto_increment,
						    course_lesson_id bigint not null,
                            question_text text not null,
                            question_marks int not null,
                            exam_id bigint not null,
                            negative_enabled boolean default false ,
                            negative_marks int not null,
                            foreign key(exam_id) references exam(exam_id),
                            foreign key(course_lesson_id) references course_lessons(course_lesson_id));
                            
create table question_options(option_id bigint primary key auto_increment,
                              question_id bigint not null,
                              option_text text not null,
                              is_correct boolean not null,
                              foreign key(question_id) references exam_question(question_id));
                              
create table student_answer(student_answer_id bigint auto_increment,
                            attempt_id bigint not null,
                            question_id bigint not null,
                            selected_option_id bigint not null,
                            foreign key(question_id) references exam_question(question_id),
                            foreign key(selected_option_id) references question_options(option_id),
                            foreign key(attempt_id) references exam_attempts(attempt_id));
                            
create table exam_attempts(attempt_id bigint auto_increment,
                           student_id bigint not null,
                           exam_id bigint not null,
                           started timestamp,
                           submited timestamp,
                           attempt_date date not null,
                           total_score int not null,
                           result enum('Pass','Fail'),
                           foreign key(exam_id) references exam(exam_id),
                            foreign key(student_id) references users(student_id));
                            
create table certificate(certificate_id bigint auto_increment,
                         attempts_id bigint not null,
                         student_id bigint not null,
                         course_id bigint not null,
                         certificate_code varchar(150) unique,
                         issued_date datetime not null,
                         foreign key(attempts_id) references exam(attempts_id),
						foreign key(student_id) references users(student_id),
                        foreign key(course_id) references courses(course_id));
                        