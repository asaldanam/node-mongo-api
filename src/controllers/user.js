import mongodb from "../clients/mongodb.js";

export async function deleteUserController(req, res) {
  const params = req.params;

  // DELETE FROM users WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').deleteMany({ id: params.id });

  // res.send({ result });
  res.send(`Usuario con id ${params.id} borrado`);
}

export async function updateUserController(req, res) {
  const params = req.params;
  const body = req.body;

  const {name, suremane, sex, date, email, password, privacity, info} = body;

  console.log('body ',body);

  // UPDATE users SET name='sara', surename='carrion'
  // WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users');

  if(name) {
    result.updateOne({ id: params.id }, { $set: { name: name } });
  }
  if(suremane) {
    result.updateOne({ id: params.id }, { $set: { suremane: suremane } });
  }
  if(sex) {
    result.updateOne({ id: params.id }, { $set: { sex: sex } });
  }
  if(date) {
    result.updateOne({ id: params.id }, { $set: { date: date } });
  }
  if(email) {
    result.updateOne({ id: params.id }, { $set: { email: email } });
  }
  if(password) {
    result.updateOne({ id: params.id }, { $set: { password: password } });
  }
  if(privacity) {
    result.updateOne({ id: params.id }, { $set: { privacity: privacity } });
  }
  if(info) {
    result.updateOne({ id: params.id }, { $set: { info: info } });
  }

  // res.send({ result });
  res.send(`Usuario con id ${params.id} modificado`);
}