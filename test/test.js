var isErrorExist = false

process.on('uncaughtException', (error)=>{
    console.log('Error detected')
    isErrorExist = true
    throw error
})

process.on('exit', ()=>{
    if(!isErrorExist) console.log('All Passed!')
})

try{
    require('assert')
}catch(e){
    throw new Error ('NO ASSERT MODULE! Use It! ->   npm install assert')
}

// Test private member access restrictions.
require('./variable/test')()

// Test class member access restrictions.
require('./class/test')()