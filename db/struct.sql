CREATE TABLE occurrence(
  id_occurrence SERIAL PRIMARY KEY NOT NULL,
  id_resource INT,
  name_solicitant VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  number_address VARCHAR(10),
  complement VARCHAR(20),    
  neighborhood VARCHAR(50),
  reference_address VARCHAR(50),
  comments TEXT,
  emergency VARCHAR(1),
  status JSONB NOT NULL,
  location JSONB NOT NULL
);

CREATE TABLE patient(
  id_patient SERIAL PRIMARY KEY NOT NULL,
  name_patient VARCHAR(50) NOT NULL,
  bith_year INT,
  blood_type VARCHAR(3),
  gender VARCHAR(1),
  allergy JSONB
);

CREATE TABLE occurrence_patient(
  id_occurrence_patient SERIAL PRIMARY KEY NOT NULL,
  id_patient INT NOT NULL,
  id_occurrence INT NOT NULL,
  complaint_patient TEXT NOT NULL,
  informations_patient TEXT,
  multimedia_communication JSONB
);

CREATE TABLE resource(
  id_resource SERIAL PRIMARY KEY NOT NULL,
  board_resource VARCHAR(50) NOT NULL,
  number_resource VARCHAR(10) NOT NULL,
  status_resource INT NOT NULL,
  location VARCHAR(50),
  player_id VARCHAR(50),
  password_resource VARCHAR(50) NOT NULL
);

ALTER TABLE occurrence 
ADD CONSTRAINT fk_occurence_resource FOREIGN KEY (id_resource) REFERENCES resource (id_resource);

ALTER TABLE occurrence_patient 
ADD CONSTRAINT fk_occurrence_patient FOREIGN KEY (id_patient) REFERENCES patient (id_patient);

ALTER TABLE occurrence_patient 
ADD CONSTRAINT fk_patient_occurrence FOREIGN KEY (id_occurrence) REFERENCES occurrence (id_occurrence);

COMMENT ON COLUMN occurrence.id_occurrence
  IS 'Occurrence ID';

COMMET ON COLUMN occurrence.id_resource 
  IS 'Resource ID';

COMMET ON COLUMN occurrence.name_solicitant 
  IS 'Name Solicitant';

COMMENT ON COLUMN occurrence.phone
  IS 'Phone of Occurrence';

COMMENT ON COLUMN occurrence.city
  IS 'City of Occurrence';

COMMENT ON COLUMN occurrence.address
  IS 'Address of Occurence';

COMMENT ON COLUMN occurrence.number_address
  IS 'Number Address of Ocurrence';

COMMENT ON COLUMN occurrence.complement
  IS 'Complement Address of Ocurrence';

COMMENT ON COLUMN occurrence.neighborhood
  IS 'Neighborhood Adress of Ocurrence';

COMMENT ON COLUMN occurrence.reference_address
  IS 'Reference Address of Ocurrence';

COMMENT ON COLUMN occurrence.gender
  IS 'Gender';

COMMENT ON COLUMN occurrence.age
  IS 'Age';

COMMENT ON COLUMN occurrence.complaint_patient
  IS 'Complaint Patient';

COMMENT ON COLUMN occurrence.comments
  IS 'Comments Ocurrence';

COMMENT ON COLUMN occurrence.emergency
  IS 'Emergency: Yes or no';

COMMENT ON COLUMN occurrence.status
  IS 'Status of Ocurrence: 1- Open,
  2- Closed';

COMMENT ON COLUMN patient.id_patient
  IS 'ID Patient';

COMMENT ON COLUMN patient.name_patient
  IS 'Name Patient';

COMMENT ON COLUMN patient.year_age
  IS 'Year of Age';

COMMENT ON COLUMN patient.blood_type
  IS 'Types of Blood';

COMMENT ON COLUMN patient.gender
  IS 'Gender: 1- Male,
  2- Female';

COMMENT ON COLUMN patient.allergy
  IS 'Types of drug allergies';

COMMENT ON COLUMN occurrence_patient.id_occurrence_patient
  IS 'ID Occurence Patient';

COMMENT ON COLUMN occurrence_patient.id_patient
  IS 'ID Patient';

COMMENT ON COLUMN occurrence_patient.id_occurrence
  IS 'ID Ocurrence';

COMMENT ON COLUMN occurrence_patient.informations_patient
  IS 'Informations of Patient';

COMMENT ON COLUMN occurrence_patient.multimedia_communication
  IS 'Communication multimedias';

COMMENT ON COLUMN resource.id_resource
  IS 'ID Resource';

COMMENT ON COLUMN resource.board_resource
  IS 'Board Resource';

COMMENT ON COLUMN resource.number_address
  IS 'Number Resource';

COMMENT ON COLUMN resource.status_resource
  IS 'Status of Resource:
  1- Activated,
  2- Stoped,
  3- Disabled';

COMMENT ON COLUMN resource.location
  IS 'Location of Resource';
