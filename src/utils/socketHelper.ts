// import { selectUser } from "app/home/home";
import { selectUser } from "app/home/home";
import { store } from "app/store";
import { io } from "socket.io-client";
import { showToast } from "utils";
import { SERVER_URL } from "./data";
let socket = io(`${SERVER_URL}`);
const dispatch = store.dispatch;

export const subscribeListeners = async() => {
    socket.on("UpdateStatus", res => {
        const { type, data } = res
        switch(type) {
        case "SET_WINNER":
            setWinner(data);
            break;
        }
        // console.log("UpdateStatus data=", data);
    })
}

const setWinner = async (data:any) => {
    const user = selectUser(store.getState());
    console.log("setWinner user=", user);
    console.log("setWinner data=", data);
    if(!user) return;
    if(user._id === data.winnerId) {
        showToast("You won in the auction. \n Please pay for it asap. \n If not, you can lose your chance.", "info", false);
    }
}