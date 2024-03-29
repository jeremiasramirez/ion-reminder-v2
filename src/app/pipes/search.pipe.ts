import { Pipe, PipeTransform } from "@angular/core"
// import { modelNotes } from '../model/model.notes'

@Pipe({
    name: "searchB"
})

export class SearchPipe implements PipeTransform{
    
    transform(arr:any,data:any){

        return arr.filter((resp:any)=>{
            if (data !== ""){
                return resp.title.toString().toLocaleLowerCase().includes(data.toLocaleLowerCase())
            }
            else{
                return resp
            }
             

        })

    }
}