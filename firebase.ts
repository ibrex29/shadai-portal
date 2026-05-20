import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWPXijDPESnVpJcioOhCoPJUB72z_nOYQ",
  authDomain: "slukjst.firebaseapp.com",
  projectId: "slukjst",
  storageBucket: "slukjst.appspot.com",
  messagingSenderId: "851485941514",
  appId: "1:851485941514:web:8ed36ea7034f437ab0e4f3",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
