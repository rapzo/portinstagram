PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
INSERT INTO "users" VALUES(1,'Anibal','a@nibal.com',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(2,'Berto','ber@to.com',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(3,'Caco','ca@co.com',NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "sqlite_sequence" VALUES('users',3);
COMMIT;
