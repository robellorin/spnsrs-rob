const functions = require("firebase-functions");
const express = require("express");
var cors = require("cors");
const settings = require("./settings/settings");
const admin = require("firebase-admin");
admin.initializeApp();
const firebaseDB = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

app.get("/profile/:username", async (req, res) => {
  let username = req.params.username;
  let userInfo = null;
  let userId = await firebaseDB
    .collection("users")
    .where("username", "==", username)
    .where("influencer", "==", true)
    .get()
    .then(querySnapshot => {
      internalUserId = null;
      querySnapshot.forEach(doc => {
        internalUserId = doc.id;
        userInfo = { id: doc.id, ...doc.data() };
      });
      return internalUserId;
    });

  if (userInfo) {
    let banners = await firebaseDB
      .collection("banners")
      .where("userId", "==", userId)
      .where("active", "==", true)
      .get()
      .then(querySnapshot => {
        let updatedBanners = [];
        querySnapshot.forEach(doc => {
          updatedBanners.push({ id: doc.id, ...doc.data() });
        });
        return updatedBanners;
      });

    let sharedBannersIdList = await firebaseDB
      .collection("shares")
      .where("influencerId", "==", userId)
      .get()
      .then(async snapshot1 => {
        let bannerIdList = [];
        snapshot1.forEach(doc => {
          bannerIdList.push(doc.data().bannerId);
        });
        return bannerIdList;
      });

    let sharedBanners = [];
    if (sharedBannersIdList.length === 0) {
      return sharedBanners;
    }
    sharedBanners = await firebaseDB
      .collection("banners")
      .where("id", "in", sharedBannersIdList)
      .where("published", "==", true)
      .get()
      .then(snapshot2 => {
        let internalBanners = [];
        snapshot2.forEach(doc => {
          internalBanners.push({ id: doc.id, ...doc.data() });
        });
        return internalBanners;
      });
    res.send({ banners, sharedBanners, userInfo });
  } else {
    res.send({ err: true, message: "The user does not exist." });
  }
});

settings.port = process.env.PORT || settings.port;

const api = functions.https.onRequest(app);

module.exports = { api };
