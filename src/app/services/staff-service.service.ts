import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../Models/staff';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {
  private host = environment.baseUrl;
  constructor(private httpCl: HttpClient) {}
  disableStaff(id: String) {
    return this.httpCl.post(`${this.host}/staff/disapprouvingStaff/${id}`, '');
  }
  enableStaff(id: String) {
    return this.httpCl.post(`${this.host}/staff/approuvingStaff/${id}`, '');
  }
  deleteSrtaff(id: String) {
    return this.httpCl.delete(`${this.host}/staff/deleteStaff/${id}`);
  }

  getStaffNotApprouved() {
    return this.httpCl.get<Staff[]>(`${this.host}/staff/staffsNotApprouved`);
  }
  getStaffApprouved() {
    return this.httpCl.get<Staff[]>(`${this.host}/staff/staffsApprouved
    `);
  }
}
