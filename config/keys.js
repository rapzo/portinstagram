module.exports = (function (env) {
//  facebook: {
//    clientID: '318902268293253',
//    clientSecret: '4aec47e522642ce9b632b7bb8a2e58d9',
//    callbackURL: 'http://psoc.12feettall.com/login/cb'
//  },
  
  //app teste
  var config = {
    development: {
      facebook: {
        clientID: '321006588082821',
        clientSecret: '0b4950bbbf7fcecc01b8b045d7136139',
        callbackURL: 'http://psoc.12feettall.com/login/facebook/cb'
      },
      twitter: {
        consumerKey: 't6mIIigzByTGWjVLalZ7vjQB6',
        consumerSecret: 'KPPnEmMnbB9pBkkmfxB6kJQwaKwabzsyaJkc0vrGBrDh16nR8t',
        callbackURL: 'http://psoc.12feettall.com/twitter/login/cb'
      },
      instagram: {
        clientID: '8eb5c39d43ad4aa394e60f878fd4e685',
        clientSecret: '5b374b994dc64903b3e491c6618ad38f',
        callbackURL: 'http://localhost:1337/login/instagram/cb'
      },
      google: {
        clientID: 'portgoogle',
        clientSecret: 'AIzaSyDTW08Xj2U1nkw_JvlIvsX1CJehuPDYwAw',
        callbackURL: 'http://psoc.12feettall.com/login/cb'
      }
    },
    production: {
      facebook: {
        clientID: '321006588082821',
        clientSecret: '0b4950bbbf7fcecc01b8b045d7136139',
        callbackURL: 'http://psoc.12feettall.com/login/facebook/cb'
      },
      twitter: {
        consumerKey: 't6mIIigzByTGWjVLalZ7vjQB6',
        consumerSecret: 'KPPnEmMnbB9pBkkmfxB6kJQwaKwabzsyaJkc0vrGBrDh16nR8t',
        callbackURL: 'http://psoc.12feettall.com/login/cb'
      },
      instagram: {
        clientID: '2f1aaed6d2b34943a91c7b0b75c2413c',
        clientSecret: 'f0fa35bb82584fbe9c3e7402a0f520c4',
        callbackURL: 'http://psoc.12feettall.com/login/instagram/cb'
      },
      google: {
        clientID: 'portgoogle',
        clientSecret: 'AIzaSyDTW08Xj2U1nkw_JvlIvsX1CJehuPDYwAw',
        callbackURL: 'http://psoc.12feettall.com/login/cb'
      }
    }
  };
  
  return config[env];
}(process.env.NODE_ENV));
