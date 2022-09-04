import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {getDatabase, ref, push, set, get, query} from 'firebase/database'

export async function register(email, password) {
    try{
        const oUC = await createUserWithEmailAndPassword(
            getAuth(),
            email, password 
        );
        return oUC.user;
    }
    catch(err){
        return err.code;
    }
}

export async function login (email, password) {
    try{
        const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
        return oUC.user;
    }
    catch(err){
        return err.code;
    }
}

export async function logout(){
    await signOut(getAuth())
}

export async function addFavorite(user,film){
    const oRef = await push(
        ref(
            getDatabase(),
            `users/${user.uid}/favorites`
        )
    );
    await set(oRef, film);
    const oSnapshot = await get(query(oRef));
    const oFilm = oSnapshot.val();
    oFilm.key = oRef.key;
    return oFilm
}

export async function getList(user){
    const oSnapshot = await get(query(ref(getDatabase(),`users/${user.uid}/favorites`)));
    const oArr = []
    let oFilm;
    oSnapshot.forEach((oDoc) => {
        oFilm = oDoc.val();
        oFilm.key = oDoc.key;
        oArr.push(oFilm);
    });
    return oArr
}