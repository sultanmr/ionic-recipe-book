import firebase from 'firebase';

export class AuthService {
    signup (email:string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    signin (email:string, password: string) {
          return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    logout () {
        firebase.auth().signOut();
    }
    signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
          });
          return firebase.auth().signInWithPopup(provider);
    }

    getActiveUser () {
        return firebase.auth().currentUser;
    }
}