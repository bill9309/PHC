import Router from 'koa-router'
const pg_db = require('./db')

const router = Router()

router
  .get('/', (req, res, next) => {
    console.log("=======================Formtype is", formtype);
    // db.any('SELECT * FROM From_Info WHERE formname = test')
    //   .then(function(data){
    //     res.status(200)
    //       .json({
    //         status: 'success',
    //         data: data,
    //         message: 'YES!'
    //       });
    //     })
    //     .catch(function(error){
    //       return next(error);
    //     });
    // });

    db.query('SELECT * FROM From_Info WHERE formname = test', (err, res2)=>{
      if(err) {
        return next(err)
      }
      res.send(JSON.stringify(res2.rows[0]));
    })
  })

export default router
