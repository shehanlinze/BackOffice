import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Devices } from '../Models/devices';
import { Class } from '../Models/class';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {
 
  private APIurl = environment.baseUrl
  constructor(private httpclient: HttpClient) { }

  // get all devices 
  getAllDevices() {
    return this.httpclient.get<Devices[]>(`${this.APIurl}/Devices/getAllDevices`)
  }
 
  // get one  device by id 
  getDeviceById(id: string) {
    return this.httpclient.get<Devices>(`${this.APIurl}/Devices/getDeviceById/${id}`)
  }

  //delete device
  deleteDeviceById(id: string) {
    return this.httpclient.delete(`${this.APIurl}/Devices/deleteDevice/${id}`)
  }
  //create device
  addDevice(addDevice: any ) {
    return this.httpclient.post(`${this.APIurl}/Devices/addNewDevice`, addDevice)
  }

  //update device
  updateDevice( id:string, updateDevice:any){
    console.log("update", updateDevice)
    console.log("id update  ", id)
    return this.httpclient.put(`${this.APIurl}/Devices/updateDevices/${id}`, updateDevice)
  }
}
