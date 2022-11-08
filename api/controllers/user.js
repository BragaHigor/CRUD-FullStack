import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM sessaovotos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
    const q =
      "INSERT INTO sessaovotos(`usuario`, `login`, `senha`, `titulo`, `descricao`, `dataInicial`, `dataFinal`, `estado` ) VALUES(?)";
  
    const values = [
      req.body.usuario,
      req.body.login,
      req.body.senha,
      req.body.titulo,
      req.body.descricao,
      req.body.dataInicial,
      req.body.dataFinal,
      req.body.estado,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Sessão criada com sucesso.");
    });
  };

  export const updateUser = (req, res) => {
    const q =
      "UPDATE sessaovotos SET `usuario` = ?, `login` = ?, `senha` = ?, `titulo` = ?, `descricao` = ?, `dataInicial` = ?, `dataFinal` = ?, `estado` = ? WHERE `id` = ?";
  
    const values = [
        req.body.usuario,
        req.body.login,
        req.body.senha,
        req.body.titulo,
        req.body.descricao,
        req.body.dataInicial,
        req.body.dataFinal,
        req.body.estado,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Sessão atualizada com sucesso.");
    });
  };

  export const deleteUser = (req, res) => {
    const q = "DELETE FROM sessaovotos WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Sessão deletada com sucesso.");
    });
  };