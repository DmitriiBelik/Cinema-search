/* eslint-disable no-unused-vars */
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {getDatabase, ref, push, set, get, query, remove} from 'firebase/database'

export async function register(email, password) {
    try{
        const oUC = await createUserWithEmailAndPassword(
            getAuth(),
            email, password 
        );
        return oUC.user;
    }
    catch(err){
        let errorElem = document.getElementById('error-block-id');
        errorElem.innerHTML = "name: " + err.name + "message" + err.message;
    }
}

export async function login (email, password) {
    try{
        const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
        return oUC.user;
    }
    catch(err){
        let errorElem = document.getElementById('error-block-id');
        errorElem.innerHTML = ''
        errorElem.append("Пользователь не найден")
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

export async function removeFavorite(user, filmID){
    const oSnapshot = await get(query(ref(getDatabase(),`users/${user.uid}/favorites`)));
    oSnapshot.forEach(item => {
        if((item['_node']['children_']['root_']['left']['right']['left']['right']['value']['value_']) == filmID){
            remove(ref(
                getDatabase(),
                `users/${user.uid}/favorites/${item['ref']['_path']['pieces_'][3]}`
            ))
        }
    })
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