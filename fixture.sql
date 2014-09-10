PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

INSERT INTO "users" VALUES(1,'Anibal','a@nibal.com',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(2,'Berto','ber@to.com',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(3,'Caco','ca@co.com',NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO "businesses" VALUES(1,'francesinhas para todos',1,1,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(2,'cafe da cena',1,2,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(3,'loja marada',2,3,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(4,'loja marada v2',3,3,'2014-09-10','2014-09-10');

INSERT INTO "bounties" VALUES(1,NULL,1,10,1,'hash',NULL,'2014-09-10',0,NULL,'2014-09-08');
INSERT INTO "bounties" VALUES(2,NULL,1,20,2,'hash2','2014-09-10','2014-09-12',0,NULL,'2014-09-09');
INSERT INTO "bounties" VALUES(3,NULL,2,30,3,'hash3','2014-09-10','2014-09-20',1,NULL,'2014-09-10');

INSERT INTO "entries" VALUES(1,1,NULL,'cenas',NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(2,10,NULL,'cenas',NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(3,1,NULL,'coisas',NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(4,1,NULL,'coisas boas',NULL,1,NULL,NULL);
INSERT INTO "entries" VALUES(5,1,1,'coisas boas',NULL,1,NULL,NULL);
INSERT INTO "entries" VALUES(6,1,2,'bounty',NULL,NULL,NULL,NULL);

INSERT INTO "rewards" VALUES(1,'freebie');
INSERT INTO "rewards" VALUES(2,'discount');
INSERT INTO "rewards" VALUES(3,'other');

INSERT INTO "business_types" VALUES(1,'restaurant');
INSERT INTO "business_types" VALUES(2,'coffee shop');
INSERT INTO "business_types" VALUES(3,'small store');
INSERT INTO "business_types" VALUES(4,'large store');

COMMIT;


