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
  gender VARCHAR(1),
  age INT,
  complaint_patient TEXT NOT NULL,
  comments TEXT,
  emergency VARCHAR(1),
  status JSONB NOT NULL
);

CREATE TABLE patient(
  id_patient SERIAL PRIMARY KEY NOT NULL,
  name_patient VARCHAR(50) NOT NULL,
  year_age INT,
  blood_type VARCHAR(3),
  gender VARCHAR(1),
  allergy JSONB
);

CREATE TABLE occurrence_patient(
  id_occurrence_patient SERIAL PRIMARY KEY NOT NULL,
  id_patient INT NOT NULL,
  id_occurrence INT NOT NULL,
  informations_patient TEXT,
  multimedia_communication JSONB
);

CREATE TABLE resource(
  id_resource SERIAL PRIMARY KEY NOT NULL,
  board_resource VARCHAR(50) NOT NULL,
  number_resource VARCHAR(10) NOT NULL,
  status_resource INT NOT NULL,
  location VARCHAR(50)
);

ALTER TABLE occurrence 
ADD CONSTRAINT fk_occurence_resource FOREIGN KEY (id_resource) REFERENCES resource (id_resource);

ALTER TABLE occurrence_patient 
ADD CONSTRAINT fk_occurrence_patient FOREIGN KEY (id_patient) REFERENCES patient (id_patient);

ALTER TABLE occurrence_patient 
ADD CONSTRAINT fk_patient_occurrence FOREIGN KEY (id_occurrence) REFERENCES occurrence (id_occurrence);

COMMENT ON COLUMN occurrence.id_occurrence
  IS 'Occurrence ID';