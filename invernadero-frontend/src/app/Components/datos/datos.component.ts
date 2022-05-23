import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service'

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(public dataService: DataService) { }
  
  public err: string = ""
  public errcolor: string = "black"

  ngOnInit(): void {
  }

  toExcel() {
    this.errcolor = "black"
    this.err = "Descargando..."
    this.dataService.toexcel().subscribe(
      (res: any) => {
        const nav = (window.navigator as any);
        var newBlob = new Blob([res], { type: "application/xlsx" });
        if (nav && nav.msSaveOrOpenBlob) {
          nav.msSaveOrOpenBlob(newBlob, 'datos.xlsx');
          this.errcolor = "green"
          this.err = "Descargado con exito"
          return;
        }
        const data = window.URL.createObjectURL(newBlob);
            
            var link = document.createElement('a');
            link.href = data;
            link.download = 'datos.xlsx';
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
            this.errcolor = "green"
            this.err = "Descargado con exito"
      },
      err => {
        this.errcolor = "red"
        this.err = "Error";
        console.log(err);
      }
    );
  }

}
