create database job_application_master;
use job_application_master;


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
                            

insert into masters(field_type,field_name) values("checkbox","technology");
insert into masters(field_type,field_name) values("radio","skill");
insert into master_options(m_id,option_value) values(5,"Hindi"),(5,"Read"),(5,"Write"),(5,"Speak");
insert into master_options(m_id,option_value) values(5,"English"),(5,"Read"),(5,"Write"),(5,"Speak"),(5,"Gujrati"),(5,"Read"),(5,"Write"),(5,"Speak");
insert into master_options(m_id,option_value) values(4,"10"),(4,"12"),(4,"BE"),(4,"MCA"),(4,"BCA"),(4,"BSc");
insert into master_options(m_id,option_value) values(3,"single"),(3,"married"),(3,"divorced");
insert into master_options(m_id,option_value) values(2,"Gujrat"),(2,"Rajasthan"),(2,"Maharastra");
insert into master_options(m_id,option_value) values(1,"Female"),(1,"Male");

delete from masters where  m_id=5;
INSERT INTO masters(field_type,field_name) VALUES("checkbox","language");


INSERT INTO masters(field_type,field_name) VALUES("radio","lang_level");


INSERT INTO master_options(m_id,option_value) VALUES
(8,"Hindi"),(8,"English"),(8,"Gujarati");


INSERT INTO master_options(m_id,option_value) VALUES
(9,"Read"),(9,"Write"),(9,"Speak");


INSERT INTO master_options (m_id, option_value) VALUES
(6, 'PHP'),
(6, 'MySQL'),
(6, 'Laravel'),
(6, 'Oracle');


INSERT INTO master_options (m_id, option_value) VALUES
(7, 'Beginner'),
(7, 'Mediator'),
(7, 'Expert');

insert into masters(field_type,field_name) values("radio","gender");
insert into masters(field_type,field_name) values("select","state");
insert into masters(field_type,field_name) values("select","relationsjip_status");
insert into masters(field_type,field_name) values("select","course");
insert into masters(field_type,field_name) values("checkbox","language");



                            
                            
select  masters.m_id ,field_type,field_name
from masters
inner join master_options
on masters.m_id=master_options.m_id
group by field_type,field_name;
