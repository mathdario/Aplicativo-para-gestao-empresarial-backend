CREATE DATABASE teste;

DROP TABLE if exists users;
CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  cpf VARCHAR(11) UNIQUE,
  phone VARCHAR(30),
  password TEXT NOT NULL,
  token TEXT
);

INSERT INTO users (name, email, cpf, phone, password) 
VALUES ('Petter', 'petterkraus2@gmail.com', '00760485099', '51994641370', '123456' );

DROP TABLE if exists clients;
CREATE TABLE clients (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  serial_id SERIAL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  phone VARCHAR(30) NOT NULL,
  zipcode VARCHAR(20),
  address VARCHAR(100),
  complement VARCHAR(100),
  neighborhood VARCHAR(20),
  city VARCHAR(20),
  state VARCHAR(20)
);

INSERT INTO clients 
(name, email, cpf, phone, zipcode, address, complement, neighborhood, city, state)
VALUES
(
  'João',
  'joao@email.com',
  '80179678027',
  '88988887777',
  '58433583',
  'Rua Dois',
  'Vizinho a Rua Um',
  'Centro',
  'São Paulo',
  'São Paulo'
);

DROP TABLE if exists charges;
CREATE TABLE charges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  serial_id SERIAL,
  client_id UUID NOT NULL REFERENCES clients(id),
  description VARCHAR(200) NOT NULL,
  status VARCHAR(8) CHECK (status = 'pendente' or status = 'pago') NOT NULL,
  value INTEGER NOT NULL,
  due_date DATE NOT NULL
);

INSERT INTO charges (client_id, description, status, value, due_date) VALUES (
  '6de1acbe-51e8-48a3-a449-27139f547990',
	'Luis',
  '78766076080',
  'devendo mais',
  'pendente',
  1000000,
  '2023/02/09'
);