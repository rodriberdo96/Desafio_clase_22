function randomNumbers (cant) {
    let numbers = []
    const min= 1
    const max= 1000
    for (let i = 0; i < cant; i++) {
        const numbers= {numbers:Math.floor(Math.random* (max - min) * 1000)}
        numbers.push(numbers)
    }
    return numbers
}

process.on ('message', (passcant) => {
    const operation = randomNumbers(passcant[0])
    process.send(operation)
})
