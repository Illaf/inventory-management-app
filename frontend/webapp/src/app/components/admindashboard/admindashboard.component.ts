import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  adminService = inject(AdminService);
  filterForm!: FormGroup;

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  loading = true;
  errorMsg = '';
  stats = { totalUsers: 0, totalOrders: 0, pendingOrders: 0, totalRevenue: 0 };
  searchTerm = '';

  showSidebar: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get('http://localhost:8800/api/admin/orders').subscribe({
      next: (res: any) => {
        console.log('Raw API response:', res);

        // ✅ The backend returns an array of orders directly, not inside `res.items`
        this.orders = Array.isArray(res) ? res : [];

        this.filteredOrders = [...this.orders];
        this.computeStats();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading orders:', err);
        this.loading = false;
        this.errorMsg = 'Failed to load orders.';
      },
    });
  }

  computeStats() {
    if (!this.orders?.length) {
      this.stats = { totalUsers: 0, totalOrders: 0, pendingOrders: 0, totalRevenue: 0 };
      return;
    }

    this.stats.totalOrders = this.orders.length;
    this.stats.pendingOrders = this.orders.filter(o => o.status === 'pending').length;
    this.stats.totalRevenue = this.orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // ✅ Count unique users
    const uniqueUsers = new Set(this.orders.map(o => o.user?._id));
    this.stats.totalUsers = uniqueUsers.size;

    console.log('Dashboard Stats:', this.stats);
  }

  applyFilters(): void {
    const { q, status, from, to } = this.filterForm?.value || {};

    this.filteredOrders = this.orders.filter(order => {
      const matchesQuery = q
        ? (order.user?.name?.toLowerCase().includes(q.toLowerCase()) ||
           order.user?.email?.toLowerCase().includes(q.toLowerCase()) ||
           order._id.includes(q))
        : true;

      const matchesStatus = status ? order.status === status : true;
      const matchesDate =
        (!from || new Date(order.placedAt) >= new Date(from)) &&
        (!to || new Date(order.placedAt) <= new Date(to));

      return matchesQuery && matchesStatus && matchesDate;
    });
  }

  clearFilters() {
    this.filterForm?.reset({
      q: '',
      status: '',
      from: '',
      to: ''
    });
    this.filteredOrders = [...this.orders];
  }

  approveOrders(id: string) {
    this.adminService.approveOrder(id).subscribe(() => {
      alert(`Order ${id} approved for packaging`);
      this.ngOnInit();
    });
  }

  updateOrderStatus(orderId: string, status: 'approved' | 'rejected') {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: (updatedOrder) => {
        this.orders = this.orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        this.filteredOrders = [...this.orders];
        this.selectedOrder = updatedOrder;
        this.computeStats();
      },
      error: (err) => console.error('Failed to update order:', err)
    });
  }

  openOrderModal(order: Order) {
    this.selectedOrder = order;
    console.log('Selected order:', order);
  }

  closeOrderModal() {
    this.selectedOrder = null;
  }
}
