import { Injectable, inject } from '@angular/core';
import { HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
http= inject(HttpClient);
  constructor() { }

  getCategories(){
    return this.http.get('https://inventory-management-app-37df.onrender.com/api/category/get')
  }
  getCategoryById(id:string){
    return this.http.get('https://inventory-management-app-37df.onrender.com/api/category/'+id)
  }
  addCategory(category:Object){
    return this.http.post("https://inventory-management-app-37df.onrender.com/api/category/add", category)
  }
  editCategory(id:string,category:Object){
return this.http.put("https://inventory-management-app-37df.onrender.com/api/category/"+id, category)
  }
  deleteCategory(id:string){
return this.http.delete("https://inventory-management-app-37df.onrender.com/api/category/"+id);
  }
}
