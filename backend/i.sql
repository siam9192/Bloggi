-- Active: 1729097050946@@127.0.0.1@5432@gfg@public

CREATE DATABASE gfg;
use gfg;
CREATE TABLE date_month_year_table (
    id SERIAL PRIMARY KEY,
    date_column DATE
);
INSERT INTO date_month_year_table
(date_column) 
VALUES
    ('2024-01-23'),
    ('2024-01-23'),
    ('2024-01-24'),
    ('2024-02-15'),
    ('2024-02-15'),
    ('2024-03-10'),
    ('2024-03-12'),
    ('2023-03-12');


 SELECT 
    EXTRACT(MONTH FROM date_column) AS month,
    EXTRACT(DAY FROM date_column) AS day,
    EXTRACT(YEAR FROM date_column) AS year,
    COUNT(*) AS count
FROM date_month_year_table
GROUP BY EXTRACT(MONTH FROM date_column), EXTRACT(DAY FROM date_column), EXTRACT(YEAR FROM date_column)
ORDER BY year, month, day;
