const Pool = require("pg").Pool;

const pool = new Pool({
  user: "guild",
  host: "localhost",
  database: "chatapi",
  password: "guildpassword",
  port: 5432,
});

const addUser = (request, response) => {
  const { username } = request.body;
  pool.query(
    "INSERT INTO users (username) VALUES ($1) RETURNING  username, id, created_at",
    [username],
    (error, results) => {
        if(error) {
            throw error;
        }
        response.status(201).send(results.rows);
    }
  );
};

const getUsers = (request, response) => {
  const userId = request.query.userId;

  let query = "SELECT * FROM users ORDER BY id DESC LIMIT 100";
  let replacements = [];

  if(userId){
    query = `SELECT * FROM users WHERE id=$1;`;
    replacements = [userId];
  }

  pool.query(
    query,
    replacements,
    (error, results) => {
      if(error){
          throw error;
      }
      response.status(200).json(results.rows);
    }
  );

}

const getMessages = (request, response) => {
  const senderId = request.query.senderId;
  const recipientId = request.query.recipientId;
  let query = "SELECT * FROM messages WHERE created_at > now() - INTERVAL '30 day' ORDER BY id DESC LIMIT 100";
  let replacements = []

  if(recipientId && senderId) {
    query = `SELECT * FROM messages WHERE recipientid=$1 AND senderid=$2 AND created_at > now() - INTERVAL '30 day' LIMIT 100;`;
    replacements = [recipientId, senderId];
  } else if (recipientId && !senderId){
    query = `SELECT * FROM messages WHERE recipientId=$1 AND created_at > now() - INTERVAL '30 day' LIMIT 100;`;
    replacements = [recipientId];
  }

  pool.query(
      query,
      replacements,
      (error, results) => {
          if(error){
              throw error;
          }
          response.status(200).json(results.rows);
      }
  );
};

const sendMessage = (request, response) => {
  const { text, senderId, recipientId } = request.body;

  pool.query(
      "INSERT INTO messages (text, recipientid, senderid) VALUES ($1, $2, $3) RETURNING text, recipientid, senderid, created_at",
      [text, recipientId, senderId],
      (error, results) => {
          if(error) {
              throw error;
          }
          response.status(201).send(results.rows);
      }
  );
};

module.exports = {
  getUsers,
  addUser,
  getMessages,
  sendMessage
};