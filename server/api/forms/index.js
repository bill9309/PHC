import Router from 'koa-router'
const pg_db = require('./db')

const router = Router()

router
  .get('/specific', async(ctx, next)=>{
    var test = {};
    // Trying to force the function to wait on the result of the query
    await pg_db.query("SELECT * FROM \"Form_Info\" WHERE formname = 'test'", (err, res2)=>{
      if(err) {
        console.log(err);
        throw err;
      }else{
        console.log("I'm supposed to happen first!");
        test = res2.rows[0];
      }
    });
    console.log("I'm supposed to happen second!");
    // store the query result, but the concurrency issue
    // causes ctx.body to take the initial value
    // of test - {} instead of res2.rows[0]
    ctx.body = test;
    ctx.status = 200;
    //console.log(ctx);
    console.log("I'm supposed to happen third!");


  })

export default router
