-- driver entity. Spec calls for a lat/long location to be returned as part of the driver
-- record, but in the real world location info would come from a separate data stream and
-- not the database that stores management data. Location data will be woven in by the
-- service at runtime.
create table if not exists drivers (
    id serial primary key,
    name varchar(100)
);

-- populate with some drivers. This is a fixed dataset (API references but does not manage this entity)
insert into drivers (id, name) values
    (1, 'Dale Earnhardt'),
    (2, 'Mario Andretti'),
    (3, 'Niki Lauda'),
    (4, 'Bandit'),
    (5, 'Santa Claus')
;

-- dummy delivery relation to allow constraining of delivery reviews
-- in the real world this record would also contain info about the order, the restaurant,
-- plus timing and other info.
create table if not exists deliveries (
    id serial primary key,
    driver_id int not null references drivers(id)
);

-- populate deliveries, and make the data at least a little bit varied: some drivers with no deliveries, some with
-- a few, at least one with a bunch. This is a fixed dataset (API references but does not manage this entity)
insert into deliveries (id, driver_id) values
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 3),
    (5, 3),
    (6, 3),
    (7, 5),
    (8, 5),
    (9, 5),
    (10, 5),
    (11, 5),
    (12, 5),
    (13, 5),
    (14, 5),
    (15, 5),
    (16, 5),
    (17, 5),
    (18, 5),
    (19, 5),
    (20, 5)
;

-- constrained list of possible star rankings for a rating of any kind
create type review_rating_stars as enum ('1', '2', '3', '4', '5');

-- review of a driver
create table if not exists driver_reviews (
    id serial primary key,
    driver_id int not null references drivers(id),
    rating review_rating_stars not null,
    description text
);

-- review of a delivery
create table if not exists delivery_reviews (
    id serial primary key,
    delivery_id int not null references deliveries(id),
    rating review_rating_stars not null,
    description text
);
