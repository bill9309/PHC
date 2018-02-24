import Router from 'koa-router'
const pg_db = require('./db')

const router = Router()

router
  .get('/specific', (ctx, next) => {
    pg_db.query("SELECT * FROM \"Form_Info\" WHERE formname = 'test'", (err, res2)=>{
      if(err) {
        console.log(err);
        throw err;
      }else{
        console.log(res2);
        ctx.body = JSON.stringify(res2.rows[0]);
        ctx.status = 200;
      }
    })
  })

export default router
