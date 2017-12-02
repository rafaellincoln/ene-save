CREATE TABLE occurrence(
  id_occurrence SERIAL PRIMARY KEY NOT NULL,
  id_patient INT NOT NULL,
  id_resources INT,
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
  blood type VARCHAR(3),
  gender VARCHAR(50),
  allergy VARCHAR(30)
);

CREATE TABLE occurrence_patient(
  id_occurrence_patient SERIAL PRIMARY KEY NOT NULL,
  id_patient NOT NULL,
  id_occurrence NOT NULL,
  informations_patient JSONB,
  multimedia_communication JSONB
);

CREATE TABLE resources(
  id_resources SERIAL PRIMARY KEY NOT NULL,
  board_resources VARCHAR(50) NOT NULL,
  number_resources INT NOT NULL
);