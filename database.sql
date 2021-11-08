
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Database name: session_submission

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (255) NOT NULL,
    "first_name" VARCHAR (255),
    "last_name" VARCHAR (255),
    "email" VARCHAR (255)
);

CREATE TABLE "format" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (255)
);

CREATE TABLE "purpose" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255)
);

CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (255)
);

CREATE TABLE "time" (
    "id" SERIAL PRIMARY KEY,
    "time_of_day" VARCHAR (255)
);

CREATE TABLE "date" (
    "id" SERIAL PRIMARY KEY,
    "date_of_event" VARCHAR (255)
);

CREATE TABLE "area_of_interest" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (255)
);

CREATE TABLE "industry" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255)    
);

CREATE TABLE "track" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255)
);

CREATE TABLE "session" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (255),
    "email" VARCHAR (255), /* Additional contact email */
    "phone" VARCHAR (255), /* Additional contact phone */
    "user_id" integer REFERENCES "user",
    "industry_id" integer REFERENCES "industry",
    "track_id" integer REFERENCES "track",
    "rehersal" BOOLEAN,
    "covid" BOOLEAN,
    "speakers" VARCHAR (500), /* Who would you like to speak at your event? */
    "diversity" BOOLEAN,
    "purpose_id" integer REFERENCES "purpose",
    "location_id" integer REFERENCES "location",
    "location_details" VARCHAR (500),
    "time_id" integer REFERENCES "time",
    "date_id" integer REFERENCES "date", 
    "votes" integer,
    "host" VARCHAR (255),
    "description" VARCHAR (1000),
    "attendees" VARCHAR (255),
    "length" VARCHAR (255), /* Approx how long will your event be */
    "format_id" integer REFERENCES "format",
    "area_of_interest_id" integer REFERENCES "area_of_interest", /* Does your event cater to one or more of the following? */
    "media" VARCHAR (500), /* links to youtube? */
    "image" VARCHAR (500), /* This might be deleted, depending on how AWS S3 bucket works */
    "success" VARCHAR (500),
    "excited" VARCHAR (500),
    "other_hosts" VARCHAR (500),
    "other_info" VARCHAR (500),
    "awaiting_approval" BOOLEAN DEFAULT false,
    "approved" BOOLEAN DEFAULT false
);

INSERT INTO "format" ("type")
VALUES ('Presentation'),
('Panel'),
('Workshop'),
('Keynote'),
('Roundtable'),
('Fireside Chat'),
('Showcase'),
('Demo'),
('Meetup'),
('Pitch'),
('Other');

INSERT INTO "purpose" ("name")
VALUES ('To Enable: Help teach a skill or set of skills'),
('To Inspire: Inspire attendees through showcasing'),
('To Connect: Help bring like minded people together so they can connect and network');

INSERT INTO "location" ("type")
VALUES ('Online via TCSW virtual venue'),
('In-person'),
('Other');

INSERT INTO "time" ("time_of_day")
VALUES ('Morning 8am-11am'),
('Midday 11am-2pm'),
('Afternoon 2pm-5pm'),
('Evening 5pm-9pm');

INSERT INTO "date" ("date_of_event")
VALUES ('Saturday, Sept. 17th'),
('Sunday, Sept. 18th'),
('Monday, Sept. 19th'),
('Tuesday, Sept. 20th'),
('Wednesday, Sept. 21st'),
('Thursday, Sept. 22nd'),
('Friday, Sept. 23rd');

INSERT INTO "area_of_interest" ("type")
VALUES ('Celebrating and empowering female founders'),
('Supporting diversity and inclusion'),
('Supporting student and youth entrepreneurs'),
('Highlighting arts and culture'),
('Engaging investors'),
('Supporting impact ventures or social enterprises'),
('None of these specifically'),
('Other');

INSERT INTO "industry" ("name")
VALUES ('General Entrepreneurship'),
('Technology'),
('Healthcare'),
('Retail'),
('Food and Ag'),
('Education & Training'),
('Sales'),
('Marketing & Advertising'),
('Investing'),
('Cryptocurrency'),
('Creative Economy'),
('Med Device/MedTech'),
('FinTech'),
('Hemp & Cannabis'),
('Smart Cities'),
('Social Impact'),
('Art & Culture'),
('Other');

INSERT INTO "track" ("name")
VALUES ('Growth'),
('Founder'),
('Designer'),
('Maker'),
('Product'),
('Developer'),
('People'),
('Spotlight'),
('Other');

INSERT INTO "user" ("first_name", "last_name", "email", "password")
VALUES ('Jess','Bucks','example@notawebsite.com','superDUPERsecret'),
('Timmy','South','timSouth@notawebsite.com','secretish'),
('Samantha','Mittens','stuffandthings@notawebsite.com','alsoasecret');

INSERT INTO "session" ("title", "email", "phone", "user_id","industry_id",
"track_id", "rehersal", "covid", "speakers", "diversity", "purpose_id", 
"location_id", "location_details", "time_id", "date_id", "votes", "host", 
"description", "attendees", "length", "format_id", "area_of_interest_id", 
"media", "image", "success", "excited", "other_hosts", "other_info", 
"awaiting_approval", "approved")
VALUES ('Session Test',
'someonetocontact@notawebsiteatall.nope', 
'1234567890', '2', '3', '1', true, true, 'Dr. Speaker McSpeakerson', true,
'2', '1','Event will be only online','4','1','0','',
'This is a description of the event. Lorum ipsum dolor sit amet...', '15-20', 
'About 30min', '2', '2', '', 'Image', 'Success looks like success', 
'I am excited to meet people who enjoy this type of event.', 'No comment', 
'No additional info.', false, false);

INSERT INTO "session" ("title", "email", "phone", "user_id","industry_id",
"track_id", "rehersal", "covid", "speakers", "diversity", "purpose_id", 
"location_id", "location_details", "time_id", "date_id", "votes", "host", 
"description", "attendees", "length", "format_id", "area_of_interest_id", 
"media", "image", "success", "excited", "other_hosts", "other_info", 
"awaiting_approval", "approved")
VALUES ('Another Session Test',
'personemail@notawebsiteatall.nope', 
'0001237654', '1', '2', '1', true, true, 'Mr. TalksALot', true,'1', '2',
'','2','2','0','','This is a description of the event. Lorum ipsum dolor sit amet...', 
'40ish', '1 hour', '3', '1', '', 'A picture', 'Lots of people and lots of talking', 
'Talking to people who enjoy what I do.', 'No comment', 'No additional info.', 
false, false);