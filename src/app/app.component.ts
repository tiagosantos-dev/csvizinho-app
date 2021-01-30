import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSVizinho-app';
  obj :any;
  showFiller = false;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
 
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
   csvJSON(csv: any){

    var lines = csv.split("\n");
  
    var result = [];
  
    var headers = lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
      var obj :any = {};
      var currentline=lines[i].split(",");
  
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  

   leCSV(evt: any) {

    var fileArr = evt.target.result.split('\n');
    var strDiv = '<table>';
  
    for (var i=0; i<fileArr.length; i++) {
         strDiv += '<tr>';
         var fileLine = fileArr[i].split(',');
             for (var j=0; j<fileLine.length; j++) {
                  strDiv += '<td>'+fileLine[j].trim()+'</td>';
        }
        strDiv += '</tr>';
    }
  
        strDiv += '</table>';
       
  }

  inputFIleChange(event : any){
    if(event.target.files && event.target.files[0]){
      console.log(event);
      const csv = <File>event.target.files[0];
    
      var leitorDeCSV = new FileReader()

      leitorDeCSV.onloadend = (e)=>{
        console.log(leitorDeCSV.result);
         this.obj = this.csvJSON(leitorDeCSV.result);
     
      }

      leitorDeCSV.readAsText(csv);
  
      // var formData = new FormData();
      // formData.append('csv', csv, csv.name);

      // console.log(formData);

      // console.log(formData.has('csv'));
      

    }

  }
}
