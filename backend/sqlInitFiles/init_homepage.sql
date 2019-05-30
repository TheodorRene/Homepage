CREATE TABLE project (
    projectid SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    img_path varchar(255),
    description TEXT,
    link varchar(255),
    type varchar(255),
    date DATE
);

CREATE TABLE info (
    infoid SERIAL PRIMARY KEY,
    text TEXT,
)
