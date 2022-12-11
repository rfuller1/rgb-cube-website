var mongoose = require('mongoose');
var User = require('../../user_db.js');


export default function handler(req, res) {
  console.log("HERE");
  console.log(req.query.hello);
  console.log("DONE HERE");

  mongoose.connect(
    process.env.MONGODB_URI,
    () => console.log("connected to mongodb")
  );

  delete mongoose.connection.models['User'];

  switch (req.method) {
    case "POST":
    console.log(req.body);
    const info = JSON.parse(req.body);
    console.log(info.name);

    var new_user = new User({
        name:info.name,
        latitude:info.latitude,
       longitude: info.longitude
    });

    // need to see if already exists
    const search_filter = { name: info.name };
    User.exists(search_filter, function (err, doc){
    if (err){
        console.log(err)
    } else {
      if (doc == null) { // no such person existed already, create and save them
        new_user.save(function(err){
          if(err) console.log(err);
        });
    } else { // did exit, update them
      const update = { latitude:info.latitude, longitude: info.longitude };
      User.findOneAndUpdate(search_filter, update, function( error, result){
      console.log("updated user info");
});
}
    }
});

    res.status(200).json({});

  break;

    case "GET":
    console.log("testing get request");

    User.findOne({name: req.query.hello }, function (err, docs) {
    if (err){
        console.log(err)
        res.status(404).json("no such name has been registered");
    }
    else{
      if (docs == null) {
        res.status(404).json("no such name has been registered");
      } else {
        console.log("sending result json...");
        res.status(200).json({ latitude: docs.latitude, longitude: docs.longitude });
      }
    }

});


  //  res.status(200).json({ latitude: '41.824460', longitude: '-71.412750' });

}
}