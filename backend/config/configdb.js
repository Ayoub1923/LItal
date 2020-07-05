const mongoose = require('mongoose')


const connectDB =
mongoose.connect( 'mongodb+srv://oussama:oussama@cluster0-memm7.mongodb.net/lital?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false })
    .then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = connectDB;