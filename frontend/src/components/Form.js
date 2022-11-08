import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
          const user = ref.current;
    
          user.usuario.value = onEdit.usuario;
          user.login.value = onEdit.login;
          user.senha.value = onEdit.senha;
          user.titulo.value = onEdit.titulo;
          user.descricao.value = onEdit.descricao;
          user.dataInicial.value = onEdit.dataInicial;
          user.dataFinal.value = onEdit.dataFinal;
          user.estado.value = onEdit.estado;
        }
      }, [onEdit]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.usuario.value ||
            !user.login.value ||
            !user.senha.value ||
            !user.titulo.value ||
            !user.descricao.value ||
            !user.dataInicial.value ||
            !user.dataFinal.value ||
            !user.estado.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
              .put("http://localhost:8800/" + onEdit.id, {
                usuario: user.usuario.value,
                login: user.login.value,
                senha: user.senha.value,
                titulo: user.titulo.value,
                descricao: user.descricao.value,
                dataInicial: user.dataInicial.value,
                dataFinal: user.dataFinal.value,
                estado: user.estado.value,
                
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));

        }else {
            await axios
              .post("http://localhost:8800", {
                usuario: user.usuario.value,
                login: user.login.value,
                senha: user.senha.value,
                titulo: user.titulo.value,
                descricao: user.descricao.value,
                dataInicial: user.dataInicial.value,
                dataFinal: user.dataFinal.value,
                estado: user.estado.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          }

            user.usuario.value = "";
            user.login.value = "";
            user.senha.value = "";
            user.titulo.value = "";
            user.descricao.value = "";
            user.dataInicial.value = "";
            user.dataFinal.value = "";
            user.estado.value = "";

            setOnEdit(null);
            getUsers();
    };


    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Usuário</Label>
                <Input name="usuario" />
            </InputArea>
            <InputArea>
                <Label>Login</Label>
                <Input name="login" />
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name="senha" type="password" />
            </InputArea>
            <InputArea>
                <Label>Título</Label>
                <Input name="titulo" />
            </InputArea>
            <InputArea>
                <Label>Descrição</Label>
                <Input name="descricao" />
            </InputArea>
            <InputArea>
                <Label>Data Inicial</Label>
                <Input name="dataInicial" type="date" />
            </InputArea>
            <InputArea>
                <Label>Data Final</Label>
                <Input name="dataFinal" type="date" />
            </InputArea>
            <InputArea>
                <Label>Estado</Label>
                <Input name="estado" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;