import React from 'react';
import './style.css';

import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import { FiSettings, FiUpload } from 'react-icons/fi'


function Profile() {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [receita, setReceita] = useState(user && user.receita);
    const [email, setEmail] = useState(user && user.email);

    const [avatarURL, setAvatarURL] = useState(user && user.avatarUrl);

    const [imageAvatar, setImageAvatar] = useState(null);


    function HandleFile(e) {

        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarURL(URL.createObjectURL(e.target.files[0]))
            }
            else {
                toast.error('Envie uma imagem do tipo PNG')
                setImageAvatar(null)
                return null
            }
        }
    }

    

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {

                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url;

                        await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlFoto,
                                nome: nome, 
                                receita: receita
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                    nome: nome, 
                                    receita: receita
                                };
                                setUser(data);
                                storageUser(data);

                            })

                    })

            })

    }

    async function handleSave(e) {
        e.preventDefault();


        if (imageAvatar === null && nome !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome, 
                    receita: receita
                })
                .then(() => {
                    let data = {
                        ...user, 
                        nome: nome,
                        receita: receita
                    }
                    setUser(data)
                    storageUser(data)
                    toast.success('Alterado com sucesso')
                })
                .catch(() => {
                    toast.success('Erro')
                })
        }
        else if (nome !== '' && imageAvatar !== null) {
            handleUpload()
        }

    }



    return (
        <div>
            <Header />
            <div className="content">
                <Title nome="Meu Perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>
                            <input type="file" accept="image/*" onChange={HandleFile} /><br />
                            {avatarURL === null ?
                                <img src={avatar} width={250} height={250} alt="Foto Perfil" />
                                :
                                <img src={avatarURL} width={250} height={250} alt="Foto Perfil" />}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <label>Receita</label>
                        <input type="text" value={receita} onChange={(e) => setReceita(e.target.value)}></input>
                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;