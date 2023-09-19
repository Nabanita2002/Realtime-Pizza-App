let addToCart = document.querySelectorAll('.add-to-cart')
import axios from 'axios'

// import React from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        console.log(res);
        cartCounter.innerText = res.data.totalQty

        // function App() {
        //     const notify = () => toast("item added to cart!!", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //         type:'success'
        //     });

        //     return (
        //         <div>
        //             <button onClick={notify}>Notify!</button>
        //             <ToastContainer
        //                 position='top-right'
        //                 autoClose={1000}
        //                 hideProgressBar={false}
        //                 newestOnTop={false}
        //                 closeOnClick
        //                 rtl={false}
        //                 pauseOnFocusLoss
        //                 draggable
        //                 pauseOnHover
        //                 theme="light"
        //             />
        //         </div>
        //     );
        // }

    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(pizza);
    })
}) 