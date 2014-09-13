PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
INSERT INTO "users" VALUES(1,'Anibal','a@nibal.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1490201464,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(2,'Berto','ber@to.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,255232503,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(3,'Caco','ca@co.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1176686913,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO "businesses" VALUES(1,'francesinhas para todos',1,1,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(2,'cafe da cena',1,2,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(3,'loja marada',2,3,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(4,'loja marada v2',3,3,'2014-09-10','2014-09-10');

INSERT INTO "bounties" VALUES(1,'o primeiro',1,10,1,'hash',NULL,'2014-09-10',0, 'Primeiro', NULL,'2014-09-08');
INSERT INTO "bounties" VALUES(2,'o segundo', 1,20,2,'hash2','2014-09-10', '2014-09-12',0,'Segundo', NULL, '2014-09-09');
INSERT INTO "bounties" VALUES(3, 'este esta terminado' ,2,30,3,'hash3','2014-09-10','2014-09-20', 1,'Terceiro',NULL, '2014-09-10');

INSERT INTO "entries" VALUES(1,1,NULL,'cenas',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(2,10,NULL,'cenas',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(3,1,NULL,'coisas',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(4,1,NULL,'coisas boas',NULL,1,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(5,1,1,'coisas boas',NULL,1,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(7,NULL,NULL,'ad',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(8,3,1,'asd',83,0,'9898',NULL,NULL);
INSERT INTO "entries" VALUES(12,3,1,'Globs of the #girlscoutcookies 🍪🔥 #cookies #mothershipglass #straightfab #slabsnotdabs',97,0,'808069340143151235_1176686913',NULL,NULL);
INSERT INTO "entries" VALUES(13,3,1,'Stumbled upon this old chunk of #girlscoutcookies 🔥🔥🍪🍪 #stillfire',103,0,'808001120610675284_1176686913',NULL,NULL);

INSERT INTO "rewards" VALUES(1,'freebie');
INSERT INTO "rewards" VALUES(2,'discount');
INSERT INTO "rewards" VALUES(3,'other');

INSERT INTO "business_types" VALUES(1,'restaurant');
INSERT INTO "business_types" VALUES(2,'coffee shop');
INSERT INTO "business_types" VALUES(3,'small store');
INSERT INTO "business_types" VALUES(4,'large store');

--CREATE INDEX users_provider_id_index on "users" ("provider_id");
create index entries_media_id_index on "entries" ("media_id");
COMMIT;

