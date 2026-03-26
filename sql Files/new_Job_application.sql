create database job_application_master;
use job_application_master;

drop table masters;
drop table master_options;
SET FOREIGN_KEY_CHECKS = 0;                
                            
insert into master_options(m_id,option_value,option_name,option_idf) values(1,"Female","Gender","Female"),(1,"Male","Gender","Male");
truncate table master_options;
select * from master_options;
select * from masters;




create table masters(m_id int auto_increment primary key,
                   field_type varchar(100) not null,
                   field_name varchar(100) not null,
                   field_label varchar(100) not null
                   );
                   
create table master_options(option_id int auto_increment primary key,
							m_id int not null,
                            option_value varchar(100) not null,
                            option_label varchar(100) not null,
                            option_idf varchar(100) not null,
                            foreign key(m_id) references masters(m_id));
insert into masters(field_type,field_name,field_label) values("radio","gender","Gender");
insert into masters(field_type,field_name,field_label) values("select","state","State");
insert into masters(field_type,field_name,field_label) values("select","relationsjip_status","Relationship Status");
insert into master_options(m_id,option_value,option_label,option_idf) values(3,"single","single","single"),(3,"married","married","married"),(3,"divorced","divorced","divorced");
insert into master_options(m_id,option_value,option_label,option_idf) values(2,"Gujrat","Gujrat","Gujrat"),(2,"Rajasthan","Rajasthan","Rajasthan"),(2,"Maharastra","Maharastra","Maharastra");
insert into master_options(m_id,option_value,option_label,option_idf) values(1,"Female","Female","Female"),(1,"Male","Male","Male");





drop table masters;
drop table master_options;


create table masters(m_id int auto_increment primary key,
                   field_type varchar(100) not null,
                   field_name varchar(100) not null
                   );
                   
create table master_options(option_id int auto_increment primary key,
							m_id int not null,
                            option_value varchar(100) not null,
                            foreign key(m_id) references masters(m_id));
 select * from master_options;
select * from masters;                           
                            
insert into masters(field_type,field_name) values("radio","gender");
insert into masters(field_type,field_name) values("select","state");
insert into masters(field_type,field_name) values("select","relationsjip_status");
insert into masters(field_type,field_name) values("select","course");
insert into masters(field_type,field_name) values("checkbox","language");
insert into master_options(m_id,option_value) values(5,"Hindi"),(5,"Read"),(5,"Write"),(5,"Speak");
insert into master_options(m_id,option_value) values(5,"English"),(5,"Read"),(5,"Write"),(5,"Speak"),(5,"Gujrati"),(5,"Read"),(5,"Write"),(5,"Speak");
insert into master_options(m_id,option_value) values(4,"10"),(4,"12"),(4,"BE"),(4,"MCA"),(4,"BCA"),(4,"BSc");
insert into master_options(m_id,option_value) values(3,"single"),(3,"married"),(3,"divorced");
insert into master_options(m_id,option_value) values(2,"Gujrat"),(2,"Rajasthan"),(2,"Maharastra");
insert into master_options(m_id,option_value) values(1,"Female"),(1,"Male");





                            
                            
select  masters.m_id ,field_type,field_name
from masters
inner join master_options
on masters.m_id=master_options.m_id
group by field_type,field_name;


select  masters.m_id ,
field_type,field_name,option_value
from masters
inner join master_options
on masters.m_id=master_options.m_id