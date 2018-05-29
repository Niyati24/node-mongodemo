var env = process.env.NODE_ENV ||'development';




if(env==='test'){
  process.env.MONGODB_URI ='mongodb://localhost:27017/TodaAppTest';
process.env.PORT=3000;
}else if(env==='development')
{ process.env.MONGODB_URI ='mongodb://localhost:27017/TodaApp';  
  process.env.PORT=3000;
}