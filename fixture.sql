PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

INSERT INTO "users" VALUES(1,'Anibal','a@nibal.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1490201464,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(2,'Berto','ber@to.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,255232503,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(3,'Caco','ca@co.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1176686913,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "users" VALUES(4,'Rui Pedro Lima',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'instagram',1490201598,'bolinhos_de_bacalhau',NULL,NULL,'http://photos-c.ak.instagram.com/hphotos-ak-xaf1/10683939_717418144991522_1454517521_a.jpg','1490201598.2f1aaed.b3c3b487f477443f8a26c3d1dc3fb030',NULL);

INSERT INTO "businesses" VALUES(1,'francesinhas para todos',1,1,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(2,'cafe da cena',1,2,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(3,'loja marada',2,3,'2014-09-10','2014-09-10');
INSERT INTO "businesses" VALUES(4,'loja marada v2',3,3,'2014-09-10','2014-09-10');

INSERT INTO "bounties" VALUES(1,'o primeiro',1,10,1,'hash',NULL,'2014-09-10',0,'Primeiro',NULL,'2014-09-08', NULL, 4);
INSERT INTO "bounties" VALUES(2,'o segundo',1,20,2,'hash2','2014-09-10','2014-09-12',0,'Segundo',NULL,'2014-09-09', NULL, 4);
INSERT INTO "bounties" VALUES(3,'este esta terminado',2,30,3,'hash3','2014-09-10','2014-09-20',1,'Terceiro',NULL,'2014-09-10', NULL, 4);
INSERT INTO "bounties" VALUES(4,'askjdhasjkd',1,1000,1,'akjsdh','today','tomorrow',0,'form 1',NULL,NULL, NULL, 4);
INSERT INTO "bounties" VALUES(5,'de tolada!!',1,1000,1,'tolada','today','tomorrow',0,'beber cerveja de tolada',NULL,NULL, NULL, 4);
INSERT INTO "bounties" VALUES(6,'teste',1,1000,1,'asdasd','today','tomorrow',0,'lel',NULL,NULL, NULL, 4);

INSERT INTO "entries" VALUES(1,1,NULL,'cenas',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(2,10,NULL,'cenas',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(3,1,NULL,'coisas',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(4,1,NULL,'coisas boas',NULL,1,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(5,1,1,'coisas boas',NULL,1,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(7,NULL,NULL,'ad',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(8,3,1,'asd',83,0,'9898',NULL,NULL,NULL,NULL);
INSERT INTO "entries" VALUES(12,3,1,'Globs of the #girlscoutcookies 🍪🔥 #cookies #mothershipglass #straightfab #slabsnotdabs',104,0,'808069340143151235_1176686913','','',NULL,NULL);
INSERT INTO "entries" VALUES(13,3,1,'Stumbled upon this old chunk of #girlscoutcookies 🔥🔥🍪🍪 #stillfire',112,0,'808001120610675284_1176686913','http://instagram.com/p/s2mLz8HepU','http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10693289_1466279460300635_539006559_s.jpg',NULL,NULL);
INSERT INTO "entries" VALUES(18,4,4,'#portinstagram #akjsdh',1,0,'808739122173247062_1490201598','http://instagram.com/p/s5N_JdGP5W/','http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10693448_687733644651059_933418692_s.jpg',NULL,NULL);
INSERT INTO "entries" VALUES(19,4,4,'Flerp d2phf',0,0,'808736867407691270_1490201598','http://instagram.com/p/s5NeVimP4G/','http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10644039_739633346091576_1363757176_s.jpg',NULL,NULL);
INSERT INTO "entries" VALUES(20,4,5,'#tolada #portinstagram',0,1,'808766950138772900_1490201598','http://instagram.com/p/s5UUGRGP2k/','http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10693362_1466395340304444_266610477_s.jpg',NULL,NULL);

INSERT INTO "rewards" VALUES(1,'freebie');
INSERT INTO "rewards" VALUES(2,'discount');
INSERT INTO "rewards" VALUES(3,'other');

INSERT INTO "business_types" VALUES(1,'restaurant');
INSERT INTO "business_types" VALUES(2,'coffee shop');
INSERT INTO "business_types" VALUES(3,'small store');
INSERT INTO "business_types" VALUES(4,'large store');


COMMIT;
