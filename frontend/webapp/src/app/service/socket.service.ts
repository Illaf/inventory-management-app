import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class SocketService{
    private socket:Socket;

    constructor() {
        this.socket = io('http://localhost:3000');
      }
      register(userId:string,role:string){
        this.socket.emit("register",{userId,role})
      }
      onNewOrder(): Observable<any>{
        return new Observable(observer => {
            this.socket.on('new-order', data => observer.next(data))
        })
      }
      onOrderStatusUpdate(): Observable<any> {
        return new Observable(observer => {
          this.socket.on('order-status-updated', data => observer.next(data));
        });
      }
}