-- Creating a movies_revenue table

CREATE TABLE movies_revenue (
	revenue_id SERIAL PRIMARY KEY,
	movie_id INT REFERENCES movies (movie_id),
	revenues_domestic NUMERIC (10,2), -- NUMERIC (10,2) 2 decimal places
	revenues_international NUMERIC (10,2)
);

SELECT * FROM movies_revenue;

-- Create a JUNCTION table with movies and actors
-- A Junction table contains largely foreign keys only for transactional data
-- Combines movies and actors table together

CREATE TABLE movies_actors (
	movie_id INT REFERENCES movies(movie_id),
	actor_id INT REFERENCES actors(actor_id),
	PRIMARY KEY(movie_id, actor_id)
);

SELECT * FROM movies_actors;























