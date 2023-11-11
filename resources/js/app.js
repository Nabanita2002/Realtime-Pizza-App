let addToCart = document.querySelectorAll('.add-to-cart')
import axios from 'axios'

import moment from 'moment'

import { initAdmin } from './admin'
// import { document } from 'postcss';







let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        console.log(res);
        cartCounter.innerText = res.data.totalQty


    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza);
    })
})



// remove alert message after x seconds


const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}




// change order status

let statuses = document.querySelectorAll('.status-line')

let hiddenInput = document.querySelector('#hiddenInput')

let order = hiddenInput ? hiddenInput.value : null

order = JSON.parse(order)

let time = document.createElement('small')

// console.log(order);

function updateStatus(order) {

    statuses.forEach((status)=>{

        status.classList.remove('step-completed')
        status.classList.remove('current')
    })

    let stepCompleted = true
    statuses.forEach((status) => {
        let dataProp = status.dataset.status

        if (stepCompleted) {
            status.classList.add('step-completed')
        }

        if (dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling)
                status.nextElementSibling.classList.add('current')
        }
    })



}

updateStatus(order)


//socket

let socket = io()  

initAdmin(socket)

//join

if (order) {
    
    socket.emit('join', `order_${order._id}`);
    
}

let adminAreaPath= window.location.pathname

if(adminAreaPath.includes('admin')){

    socket.emit('join','adminRoom')

}


socket.on('orderUpdated',()=>{
    const updatedOrder={...order}
    
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status

    // updateStatus(updatedOrder)
    // the status message to be displayed

    console.log(data);
    
})