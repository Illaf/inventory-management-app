import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class SocketService {

  private socket!: Socket;

  constructor() {
    
  }

  
  connect() {
    this.socket = io('http://localhost:8800');
  
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });
  
    this.socket.on('connect_error', (err) => {
      console.error(' Socket connection error:', err);
    });
  }
  

  register(userId: string, role: string) {
    if (!this.socket) return;
    this.socket.emit('register', { userId, role });
  }

  onNewOrder(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('new-order', data => observer.next(data));
    });
  }

  onOrderStatusUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('order-status-updated', data => observer.next(data));
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}
