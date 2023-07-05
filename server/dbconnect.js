const mongoose=require('mongoose');

module.exports=async()=>{
    const mongoUri='mongodb+srv://priyanshusobti02:2LSKFuV35NWqsyXp@cluster0.2f09xpw.mongodb.net/?retryWrites=true&w=majority';
    try{
        const connect=await mongoose.connect(mongoUri,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log('MongoDB Connected: '+connect.connection.host);
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}