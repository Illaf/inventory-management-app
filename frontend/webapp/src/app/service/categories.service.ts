import { Injectable, inject } from '@angular/core';
import { HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
http= inject(HttpClient);
  constructor() { }

  getCategories(){
    return this.http.get('http://localhost:8800/api/category/get')
  }
  getCategoryById(id:string){
    return this.http.get('http://localhost:8800/api/category/'+id)
  }
  addCategory(category:Object){
    return this.http.post("http://localhost:8800/api/category/add", category)
  }
  editCategory(id:string,category:Object){
return this.http.put("http://localhost:8800/api/category/"+id, category)
  }
  deleteCategory(id:string){
return this.http.delete("http://localhost:8800/api/category/"+id);
  }
}
