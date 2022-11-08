import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
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

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #32CD32;
  color: white;
  height: 42px;
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

  const [numeroSim, setNumeroSim] = useState(0);

  const [numeroNao, setNumeroNao] = useState(0);

    const handleEdit = (item) => {
      setOnEdit(item);
    };
  
    const handleDelete = async (id) => {
      await axios
        .delete("http://localhost:8800/" + id)
        .then(({ data }) => {
          const newArray = users.filter((user) => user.id !== id);
  
          setUsers(newArray);
          toast.success(data);
        })
        .catch(({ data }) => toast.error(data));
  
      setOnEdit(null);
    };


    return (

      <FormContainer>
        <Table>
            <Thead>
                <Tr>
                    <Th>Título</Th>
                    <Th>Descrição</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
             {users.map((item, i) => (
                <Tr key={i}>
                    <Td width="30%">{item.titulo}</Td>
                    <Td width="30%">{item.descricao}</Td>
                    <Td> 
                      <Button onClick={() => setNumeroSim(numeroSim+1)}>SIM</Button>
                        <p>
                          Quantidade de votos <span>{numeroSim}</span>
                        </p>
                      <Button onClick={() => setNumeroNao(numeroNao+1)}>NÃO</Button>
                      <p>
                        Quantidade de votos <span>{numeroNao}</span>
                        </p>
                    </Td>
                    <Td alignCenter width="5%">
                        <FaEdit onClick={() => handleEdit(item)} />
                    </Td>
                    <Td alignCenter width="5%">
                        <FaTrash onClick={() => handleDelete(item.id)} />
                    </Td>
                </Tr>
        ))}
      </Tbody>
        </Table>
        </FormContainer>
    );
};

export default Grid;