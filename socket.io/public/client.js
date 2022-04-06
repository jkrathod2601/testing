var socket = io();
let name;
while(!name){
    name=prompt("enter your name")
}

console.log(name);

const appendmsg=(msg,type)=>{
    if(type=="out"){
        let data=document.getElementById('mainblock').innerHTML+
        `
        <div class="media media-chat media-chat-reverse">
            <div class="media-body">
            <b>${msg.msg}</b>
            <p>${msg.date}</p>
            </div>
        </div>
        `
        document.getElementById('mainblock').innerHTML=data
    }
    if(type=="in"){
        let data=document.getElementById('mainblock').innerHTML+
        `
        <div class="media media-chat">
            <div class="media-body">
                <b>${msg.msg}</b>
                <p>${msg.username}</p>
                <p>${msg.date}</p>
            </div>
        </div>
        `
        document.getElementById('mainblock').innerHTML=data
    }
}

const sendmsg=()=>{
    let sentmsg=document.getElementById('inputtext').value
    console.log(sentmsg)
    document.getElementById('inputtext').value=""
    let msg={
        username:name,
        msg:sentmsg,
        date:new Date().toISOString()
    }
    appendmsg(msg,"out")

    socket.emit('message',msg)
}

socket.on('message',(data)=>{
    console.log(data)
    appendmsg(data,'in')
})
