create database school;
use school;

create database hospital;
use hospital;

create table patients(patient_id bigint primary key auto_increment,
                      full_name varchar(50) not null,
                      email varchar(50) not null unique,
                      gender enum('Male','Female','Other') Not Null ,
                      phone varchar(20) unique,
                      created_at Timestamp default current_timestamp);
insert into patients(full_name,email,gender,phone)
values('Rohan','rohan@gmail.com','Male', 1234567890);                      
create table doctors(doctor_id bigint primary key auto_increment,
					full_name varchar(50) Not null,
                    specialization varchar(100) not null,
                    experience_year int check(experience_year >= 0),
                    created_at timestamp default current_timestamp);
                    
insert into doctors(full_name,specialization,experience_year)
values('Dr.Mehta','Cardiology',12);
                    
create table treatments(treatment_id bigint primary key auto_increment,
                       treatment_name varchar(100) not null,
                       treatment_type enum('General','insurance') NOT NULL,
                       cost DECIMAL(10,2) not null,
                       minimum_passing_score INT NOT NULL,
                       doctor_id bigint not null,
                       foreign key(doctor_id) references doctors(doctor_id)
                       );
insert into treatments(treatment_name,treatment_type,cost,minimum_passing_score,doctor_id) 
values('Cardiology','insurance',50000.00,60,1);


create table patient_treatments(enrollment_id bigint primary key auto_increment,
                                 patient_id bigint not null,
                                 treatment_id bigint not null,
                                 insurance_is_approved boolean Default false,
                                 status enum('Active','Complete','Abdonet') Default 'Active',
                                 enrolled_at timestamp default current_timestamp,
                                 unique key(patient_id,treatment_id),
                                  foreign key(patient_id) references patients(patient_id),
                                  foreign key(treatment_id) references treatments(treatment_id)
                                  );
                                  
insert into patient_treatments(patient_id,treatment_id,insurance_is_approved,status) 
values(1,1,TRUE,'Complete');				
create table treatment_sessions(session_id bigint primary key auto_increment,
                                treatment_id bigint not null,
                                session_duration int not null check(session_duration between 1 and 8),
                                note text ,
                                prescription text not null,
                                lab_report varchar(255),
                                unique(treatment_id),
                                created_at timestamp default current_timestamp,
                                foreign key(treatment_id) references treatments(treatment_id));
alter table treatment_sessions rename column  session_duration to session_number;
insert into treatment_sessions(treatment_id,session_duration,prescription)
values(1,1,'Excercise monitoring');
set foreign_key_checks =1;
create table session_logs(log_id bigint primary key auto_increment,
                                enrollment_id bigint not null,
								session_id bigint not null,
                                visit_time timestamp default current_timestamp,
                                completed boolean default false,
                                foreign key(enrollment_id) references patient_treatments(enrollment_id),
                                foreign key(session_id)  references treatment_sessions(session_id));
                                
insert into session_logs(enrollment_id,session_id,completed)
values(1,1,TRUE);				

create table evalution(evalution_id bigint primary key auto_increment,
                        treatment_id bigint not null,
                        foreign key(treatment_id) references treatments(treatment_id));		
                        
insert into evalution(treatment_id) values(1);
				
create table evaluton_questions(question_id bigint primary key auto_increment,
								evalution_id bigint not null,
                                question text not null,
                                marks int not null,
                                foreign key (evalution_id) references evalution(evalution_id));

insert into evaluton_questions(evalution_id, question,marks) values(1,'What is normal heart rate',5),(1,'Best recovery excercise',5);
create table question_options(option_id bigint primary key auto_increment,
								question_id bigint not null,
                                option_text text not null,
                                is_correct boolean default false,
                                foreign key (question_id) references evaluton_questions(question_id));
insert into question_options(question_id,option_text,is_correct) values(1,'40-60 bpm', true),(1,'60-70 bpm', false),(1,'70-80 bpm', false),(1,'80-90 bpm', false);
create table evalution_attempts(attemp_id bigint primary key auto_increment,
                                enrollment_id bigint not null,
                                marks int not null,
                                score boolean not null,
                                attempts_at timestamp default current_timestamp,
                                foreign key(enrollment_id)references patient_treatments(enrollment_id));
                                
insert into evalution_attempts(enrollment_id,marks,score) values(1,60,1);

create table discharge_summeries(discharg_id bigint primary key auto_increment,
                                 enrollment_id bigint not null,
                                 final_score int not null,
                                 dishcharge_date date,
                                 certificate_code varchar(100) unique not null,
                                 foreign key(enrollment_id) references patient_treatments(enrollment_id));	
                                 
insert into discharge_summeries(enrollment_id,final_score,dishcharge_date,certificate_code) values(1,75,CURDATE(),'Dish-2026-001');

select * from discharge_summeries;