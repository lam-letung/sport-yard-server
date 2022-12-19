import express from 'express';
import { createServer } from "http";
import cors from "cors";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import db from './utils/db/index.js'

const app = express();

app.use(cors())
dotenv.config()

const server = createServer(app)

const io = new Server(server , {
  cors : {
    origin: "*",
    method: ["GET" , "POST"]
  }
})

const PORT = process.env.PORT || 5000
const timeChek = 1000 * 60 

let users = [];

let orders_pending = [];


io.on('connection', function (socket) {
    socket.on('user-connected', ({userId}) => {
      console.log('User ' + userId + ' connected');
      // saving userId to object with socket ID
      if (!users.some((u) => u.userId === userId)) {
        users = [...users, { socketId: socket.id, userId: userId  }]
        socket.join(userId); 
      }
      console.log("users :", users);
      io.emit("users-online", users)
    });

    socket.on("send_message" , ({ sender , receiverId }) => {
      io.to(receiverId).emit("receive_message" , {
        sender 
      })
    })
  
    socket.on("user-typing", (data) => {
      const index = users.findIndex((u) => u.userId === data.userId)
      if (index !== -1) {
        users[index].typing = data.typing
        users[index].receiverId = data.receiverId
      }
      io.emit("users-online", users)
    })

    socket.on("send_order" , data => {
    console.log("orders_pending ",data)
    orders_pending = [...orders_pending , data]
    let timerId = setInterval(() => {
            if(orders_pending.length === 0){
               clearInterval(timerId);
               console.log("Clear Interval");
            }else{
              const dateNow = new Date()
               const orders_expired = orders_pending?.filter(o => {
                const date = new Date(o.createdAt).getDate()
                const hours = new Date(o.createdAt).getHours()
                const mins = new Date(o.createdAt).getMinutes() 
                 return date === dateNow.getDate() && dateNow.getHours() >= hours + 1  && mins < dateNow.getMinutes()
               })
               console.log("orders_pending:",orders_pending)
               console.log("orders_expired :",orders_expired)
               if(orders_expired.length > 0){
                orders_expired.forEach(o => {
                    db.collection('orders').doc(o.orderId).update({
                        status : 10
                  })
                  orders_pending = orders_pending.filter(order_pending => order_pending.orderId !== o.orderId)
                  console.log(`Remove order ${o.orderId}`);
                })
                console.log("orders_pending:",orders_pending)
               }
            }
      },timeChek)
    })
    socket.on("delete_order" , data => {
        orders_pending = orders_pending.filter(o => o.orderId !== data.orderId)
        console.log("Order",orders_pending)
    })
    socket.on('disconnect', () => {
      console.log('user ' + users[socket.id] + ' disconnected');
      // remove saved socket from users object
      users = users.filter((u) => u.socketId !== socket.id)
      console.log("users :", users);
      io.emit("users-online", users)
    });
  });


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
