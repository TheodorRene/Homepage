CREATE TABLE project (
    projectid SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    img_path varchar(255),
    description TEXT,
    link varchar(255)
);
