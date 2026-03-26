create database job_application;
use job_application;

create table basic_details(applicant_id int primary key auto_increment,
                           first_name varchar(150) not null,
                           last_name varchar(150) not null,
                           designation varchar(150) not null,
                           address1 text not null,
						   email varchar(150) unique not null,
						   address2 text ,
                           city varchar(80) not null,
                           phone_number varchar(15) not null,
                           state varchar(50) not null,
                           gender varchar(20) not null,
                           zip_code int not null,
                           relationsjip_status varchar(50) not null,
                           birth_date date not null
                           ) ;
                           -- on delete cascade delete all value of parents table which present in child table

update basic_details set applicant_id=2 where applicant_id=3;
insert into basic_details values(2,"Krish","Gurjar","BA","Lalpur","krish2@gmail.com","Jamnagar","Ahemdabad","8200956235","Gujrat","Male",365602,"Married",'2025-10-25');
               delete from basic_details where applicant_id=2;            
create table education_details(education_id int primary key auto_increment,
                              applicant_id int not null,
                               course_name varchar(50) not null,
                               passing_year year not null,
                               uni_board varchar(50) not null,
                               result decimal(2,2) not null,
                               foreign key(applicant_id) references basic_details(applicant_id));
                               
create table work_experiences(work_experience_id int primary key auto_increment,
                            applicant_id int not null,
                            company_name varchar(60) not null,
                            from_date date not null,
                            to_date date not null,
                            annual_Package decimal(6,2) not null,
                            reason_live text not null,
                            contact_number varchar(15) not null,
                            ref_ct_Name varchar(50) not null,
                            foreign key(applicant_id) references basic_details(applicant_id));
 
create table languages(language_id int primary key auto_increment,
					   language_name varchar(50) not null);
					
		
                       
create table language_knowns(language_known_id int primary key auto_increment,
							language_id int not null,
                            applicant_id int not null,
                            language_name varchar(50) ,
                            can_read boolean,
                            can_write boolean,
                            can_speak boolean,
                            foreign key(applicant_id) references basic_details(applicant_id),
                            foreign key(language_id) references languages(language_id)
                            );
                            
create table technologies(tech_id int primary key auto_increment,
                          tech_name varchar(50) not null);
  insert into language_knowns(language_id,language_name,applicant_id) values(2,"English",1),(3,"Gujrati",1) ;  
  update language_knowns set can_read=1,can_write=1,can_speak=1 where applicant_id=1;
                          
create table technologies_knowns(technologies_known_id int primary key auto_increment,
                                applicant_id int not null,
                                technology_name varchar(50),
                                is_beginer boolean,
                                is_mideator boolean,
                                is_expert boolean,
                                foreign key(applicant_id) references basic_details(applicant_id)
                                );
                                
create table refrences(refrence_id int primary key auto_increment,
                               applicant_id int not null,
                              refrence_name varchar(50) not null,
                              contact_number varchar(15) not null,
                              relation varchar(50) not null,
                              foreign key(applicant_id) references basic_details(applicant_id)
                              );
                              
 create table preferances(preference_id int primary key auto_increment,
                          applicant_id int not null,
                         preference_location varchar(50) not null,
                         notice_period varchar(50) not null,
                         expected_ctc decimal(5,2) not null,
                         current_ctc decimal(5,2) not null,
                         department varchar(50) not null,                      
                         foreign key(applicant_id) references basic_details(applicant_id)) ; 
       
update preferances set preference_location="surat" where applicant_id=4;    
 SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE preferances;
TRUNCATE TABLE refrences;
TRUNCATE TABLE technologies_knowns;
TRUNCATE TABLE language_knowns;
TRUNCATE TABLE work_experiences;
TRUNCATE TABLE education_details;
TRUNCATE TABLE basic_details;

SET FOREIGN_KEY_CHECKS = 1;
   

SELECT * FROM basic_details;
SELECT * FROM education_details;
SELECT * FROM work_experiences;
SELECT * FROM languages;
SELECT * FROM language_knowns;
SELECT * FROM technologies;
SELECT * FROM technologies_knowns;
SELECT * FROM refrences;
SELECT * FROM preferances;


 delete from languages where language_id between 5 AND 8;
 
ALTER TABLE preferances 
MODIFY COLUMN preference_location VARCHAR(255) NOT NULL;

  desc basic_details;
  select * from basic_details;
  select*from technologies_knowns;
  
  DELETE FROM work_experiences WHERE applicant_id =7;
    DELETE FROM education_details WHERE applicant_id =7;
  ALTER TABLE preferances 
MODIFY COLUMN expected_ctc DECIMAL(10,2) NOT NULL,
MODIFY COLUMN current_ctc DECIMAL(10,2) ;

ALTER TABLE education_details 
MODIFY COLUMN result DECIMAL(5,2) NOT NULL;

ALTER TABLE work_experiences 
MODIFY COLUMN annual_Package DECIMAL(10,2) NOT NULL;

INSERT INTO languages (language_name) VALUES ('Hindi'), ('English'), ('Gujrati');
INSERT INTO technologies (tech_name) 
VALUES ('PHP'), ('Mysql'), ('larave'), ('Oracle');

delete from refrences where refrence_id=4;
