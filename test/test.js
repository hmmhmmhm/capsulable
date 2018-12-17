var isErrorExist = false

process.on('uncaughtException', (error)=>{
    console.log('Error detected')
    isErrorExist = true
    throw error
})

process.on('exit', ()=>{
    if(!isErrorExist) console.log('All Passed!')
})

// Test private member access restrictions.
require('./variable/test')()

// Test class member access restrictions.
require('./class/test')()