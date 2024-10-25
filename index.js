import express from "express";
import bodyParser from "body-parser";
import pool from "./dbConfig.js";  // Import the pool configuration

const app = express();
const port = 3000;
pool.connect(); // postgreSQL database connection


app.use(bodyParser.urlencoded({ extended: true })); // for POST requests
app.use(express.static("public")); // for styling files

app.get("/", async (req, res) => {

  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id ASC");
    let items = result.rows;
  
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try {
    const items = await pool.query(
      "INSERT INTO items (title) VALUES ($1)", 
      [item]
      );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/edit", async (req, res) => {

  const updatedItemTitle = req.body.updatedItemTitle;
  const updatedItemId = req.body.updatedItemId;

  try {
    await pool.query("UPDATE items SET title = ($1) WHERE id = ($2)",
    [updatedItemTitle, updatedItemId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }


});

app.post("/delete", async (req, res) => {

  const deleteItemId = req.body.deleteItemId;

  try {
    await pool.query("DELETE FROM items WHERE id = ($1)", [deleteItemId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
